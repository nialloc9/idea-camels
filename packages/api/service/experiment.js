const { onGetWithThemeByAccountRef, onCreate } = require("../data/experiment");
const { onCreate: onCreateTheme } = require("../data/theme");
const { onGet: onGetDomainByDomainRef } = require("../data/domain");
const { onGet: onGetAccount } = require("../data/account");
const {
  generateRandomId,
  handleSuccess,
  getDateInYYMMDD,
} = require("../utils/utils");
const {
  getMetrics,
  createCampaign,
  createBudget,
  createAdGroup,
  createAdGroupAd,
  createAdGroupCriterion,
} = require("../utils/googleAds");
const { runTask, uploadToS3 } = require("../utils/aws");
const { writeToTmpFile } = require("../utils/file");
const { chargeCustomer } = require("../utils/stripe");
const {
  calculateAdBudgetMinusMarkup,
  calculateTotalExperimentCost,
} = require("../utils/payments");
const config = require("../utils/config");

const onGetAccountExperiments = ({
  data: {
    decodedToken: {
      data: { accountRef },
    },
  },
  caller,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const metrics = await getMetrics({
        metrics: ["clicks", "impressions"],
        orderBy: "clicks",
        adGroupResourceName: "customers/9074082905/adGroups/108117690178",
      });

      const {
        data: { experiments },
      } = await onGetWithThemeByAccountRef({ data: { accountRef }, caller });

      const campaigns = await listCampaigns();

      // TODO: run cron to update database to expired for domains going to expire tomorrow
      // TODO: run cron to send email for domains going to expire in 1 month and in 1 week
      resolve(
        handleSuccess(`SERVICE - GET_ACCOUNT_EXPERIMENTS - FROM ${caller}`, {
          experiments,
          metrics,
          campaigns,
        })
      );
    } catch (error) {
      reject(error);
    }
  });

/**
 * @description Creates an experiment by uploading theme/content files to s3 and storing config in db before starting ecs task to create website
 * @param {*} param0
 * @returns
 */
const onCreateExperiment = ({
  data: {
    decodedToken: {
      data: { accountRef },
    },
    domainRef,
    content,
    theme,
    budget,
    endDate,
    templateRef,
    description,
    headline,
    headline2,
    keywords,
  },
  caller,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const { data: accountData } = await onGetAccount({
        data: { accountRef },
        caller,
      });

      const { payment_customer_id } = accountData[0];
      const {
        data: { domains },
      } = await onGetDomainByDomainRef({
        data: { accountRef, domainRef },
        caller,
      });

      const { name } = domains[0];
      console.log(
        "calculateTotalExperimentCost({ budget }",
        calculateTotalExperimentCost({ budget })
      );
      await chargeCustomer({
        customerId: payment_customer_id,
        amount: calculateTotalExperimentCost({ budget }),
        caller,
        accountRef,
        description: `Creating experiment for ${name}`,
      });

      const {
        path: contentPath,
        cleanup: onContentCleanUp,
      } = await writeToTmpFile({ data: content });
      const {
        path: themePath,
        cleanup: onThemeCleanUp,
      } = await writeToTmpFile({ data: theme });

      const filename = `${generateRandomId()}.js`;

      const { key: themeKey } = await uploadToS3({
        path: themePath,
        key: `${accountRef}/themes/${filename}`,
        bucket: config.builder.themes.bucketName,
        caller,
      });

      const { key: contentKey } = await uploadToS3({
        path: contentPath,
        key: `${accountRef}/contents/${filename}`,
        bucket: config.builder.themes.bucketName,
        caller,
      });

      // remove tmp files
      onContentCleanUp();
      onThemeCleanUp();

      const themeData = {
        content: contentKey,
        theme: themeKey,
        lastUpdatedBy: accountRef,
        createdBy: accountRef,
      };

      const {
        data: { theme_ref: themeRef },
      } = await onCreateTheme({ data: themeData, caller });

      const experiment = {
        themeRef,
        accountRef,
        domainRef,
        budget: parseInt(budget),
        endDate: parseInt(endDate),
        templateRef,
      };

      const { data: newExperiment } = await onCreate({
        data: experiment,
        caller,
      });

      const { error: taskError } = await runTask({
        cluster: config.aws.clusters.builder.name,
        taskDefinition: config.aws.clusters.builder.taskDefinition,
        environmentVariables: [
          {
            name: "EXPERIMENT_REF",
            value: newExperiment.experiment_ref.toString(),
          },
          { name: "TEMPLATE_REF", value: templateRef.toString() },
        ],
      });

      if (taskError) {
        throw new Error(taskError);
      }

      const campaignBudget = {
        amount_micros: calculateAdBudgetMinusMarkup({ budget }) * 1000000,
        explicitly_shared: false, // only for this campaign
        name: `${accountRef}-${domainRef}-${newExperiment.experiment_ref}-${name}-budget`,
        period: 2, // DAILY - period to spend budget
        status: 2, // ENABLED
        type: 2, // STANDARD - caps daily spend at twice the specified budget amount
      };

      const { resource_name: budgetName } = await createBudget(campaignBudget);

      const campaign = {
        advertising_channel_type: 2, // search
        bidding_strategy_type: 9, // target spend. i.e get as many clicks as possible in budget
        campaign_budget: budgetName,
        end_date: getDateInYYMMDD(endDate),
        name: `${accountRef}-${domainRef}-${newExperiment.experiment_ref}-${name}-campaign`,
        payment_mode: 4, // CLICKs i.e pay perclick
        start_date: getDateInYYMMDD(),
        status: 2, // ENABLED
      };

      const { resource_name: campaignName } = await createCampaign(campaign);

      const adGroup = {
        ad_rotation_mode: 2, // OPTIMIZE - Optimize ad group ads base don clicks or concersions
        campaign: campaignName,
        cpc_bid_micros: (budget / 5) * 1000000,
        cpm_bid_micros: (budget / 5) * 1000000,
        explorer_auto_optimizer_setting: { opt_in: false },
        name: `${accountRef}-${domainRef}-${newExperiment.experiment_ref}-${name}-adgroup`,
        status: 2, // ENABLED
        targeting_setting: {},
        type: 2, // SEARCH CAMPAIGNS
        url_custom_parameters: [],
      };

      const { resource_name: adGroupName } = await createAdGroup(adGroup);

      const adGroupAd = {
        ad: {
          added_by_google_ads: false,
          device_preference: 0,
          expanded_text_ad: {
            description,
            headline_part1: headline,
            headline_part2: headline2,
          },
          final_app_urls: [],
          final_mobile_urls: [],
          final_urls: [`https://${name}`],
          url_collections: [],
          url_custom_parameters: [],
        },
        ad_group: adGroupName,
        status: 2, // ENABLED
      };

      const { resource_name: adGroupAdName } = await createAdGroupAd(adGroupAd);

      const keywordCriterians = keywords.reduce((total = [], curr) => {
        if (curr) {
          total.push({
            ad_group: adGroupName,
            final_mobile_urls: [],
            final_urls: [],
            keyword: { match_type: 4, text: curr }, // Broad range match of keyword
            negative: false, // target the keyword. True is exlude keyword
            status: 2, // ENABLED
          });
        }

        return total;
      }, []);

      const criterions = await createAdGroupCriterion(keywordCriterians);

      const criterionsToAddToDb = criterions.reduce(
        (total = [], { resource_name: criterionName }, index) => {
          total[`keyword${index}`] = criterionName;

          return total;
        },
        []
      );

      const ideacamelsCampaign = {
        accountRef,
        experimentRef: newExperiment.experiment_ref,
        campaignName,
        budgetName,
        adGroupName,
        adGroupAdName,
        ...criterionsToAddToDb,
      };

      resolve(
        handleSuccess("SERVICE - Create Experiment Success", {
          ...newExperiment,
          name,
          content: contentKey,
          theme: themeKey,
          campaign: ideacamelsCampaign,
        })
      );
    } catch (error) {
      console.log("error", error);
      reject(error);
    }
  });

module.exports = {
  onGetAccountExperiments,
  onCreateExperiment,
};

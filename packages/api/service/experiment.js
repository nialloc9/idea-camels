const {
  onGetWithThemeAndCampaignByAccountRef,
  onCreate,
} = require("../data/experiment");
const { onCreate: onCreateTheme } = require("../data/theme");
const { onGet: onGetDomainByDomainRef } = require("../data/domain");
const { onGet: onGetAccount } = require("../data/account");
const { onCreate: onCreateCampaign } = require("../data/campaign");
const { onGetMultiple: onGetMultipleLeads } = require("../data/leads");
const { generateRandomId, handleSuccess } = require("../utils/utils");
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
const { calculateTotalExperimentCost } = require("../utils/payments");
const config = require("../utils/config");
const {
  mapCriterionsToDb,
  mapKeywordsToCriterionToCreate,
  mapExperimentsToAdGroupNames,
  mapBuildExperimentToECSConfig,
  mapExperimentToCampaignBudget,
  mapExperimentToCampaign,
  mapExperimentToAdGroup,
  mapExperimentToAdGroupAd,
  mapMetricsToExperiment,
  mapExperimentsToLeads,
} = require("./utils/experiment");

/**
 * @description gets experiments linked to account
 * @param {*} param0
 * @returns
 */
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
      const {
        data: { experiments },
      } = await onGetWithThemeAndCampaignByAccountRef({
        data: { accountRef },
        caller,
      });

      const response = {
        experiments,
      };

      if (experiments.length > 0) {
        const metrics = await getMetrics({
          metrics: [
            "clicks",
            "impressions",
            "average_cpm",
            "average_cpc",
            "cost_micros",
            "engagements",
            "gmail_forwards",
          ],
          orderBy: "clicks",
          adGroupResourceName: mapExperimentsToAdGroupNames(experiments), // e.g ["customers/9074082905/adGroups/108117690178"]
        });

        const experimentsWithMetrics = mapMetricsToExperiment({
          experiments,
          metrics,
        });

        const { data: leads } = await onGetMultipleLeads({
          data: {
            experimentRef: experimentsWithMetrics.map(
              ({ experiment_ref }) => experiment_ref
            ),
          },
          caller,
        });

        response.experiments = mapExperimentsToLeads({
          experiments: experimentsWithMetrics,
          leads,
        });
      }

      // TODO: run cron to update database to expired for domains going to expire tomorrow
      // TODO: run cron to send email for domains going to expire in 1 month and in 1 week
      resolve(
        handleSuccess(
          `SERVICE - GET_ACCOUNT_EXPERIMENTS - FROM ${caller}`,
          response
        )
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
    endDate,
    content,
    theme,
    budget,
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
        endDate: parseInt(endDate),
        budget: parseInt(budget),
        templateRef,
      };

      const { data: newExperiment } = await onCreate({
        data: experiment,
        caller,
      });

      const { error: taskError } = await runTask(
        mapBuildExperimentToECSConfig({
          experimentRef: newExperiment.experiment_ref,
          templateRef,
        })
      );

      if (taskError) {
        throw new Error(taskError);
      }

      const { resource_name: budgetName } = await createBudget(
        mapExperimentToCampaignBudget({
          budget,
          accountRef,
          domainRef,
          experimentRef: newExperiment.experiment_ref,
          name: `${name}_${caller}`,
        })
      );

      const { resource_name: campaignName } = await createCampaign(
        mapExperimentToCampaign({
          accountRef,
          experimentRef: newExperiment.experiment_ref,
          budgetName,
          domainRef,
          endDate,
          name: `${name}_${caller}`,
        })
      );

      const { resource_name: adGroupName } = await createAdGroup(
        mapExperimentToAdGroup({
          campaignName,
          budget,
          experimentRef: newExperiment.experiment_ref,
          accountRef,
          domainRef,
          name: `${name}_${caller}`,
        })
      );

      const { resource_name: adGroupAdName } = await createAdGroupAd(
        mapExperimentToAdGroupAd({
          name,
          adGroupName,
          description,
          headline,
          headline2,
        })
      );

      const keywordCriterians = mapKeywordsToCriterionToCreate({
        keywords,
        adGroupName,
      });

      const criterions = await createAdGroupCriterion(keywordCriterians);

      const mappedCriterionToDb = mapCriterionsToDb({
        criterions,
        keywords,
      });

      const { data: campaignData } = await onCreateCampaign({
        data: {
          accountRef,
          experimentRef: newExperiment.experiment_ref,
          campaignName,
          budgetName,
          adGroupName,
          adGroupAdName,
          headline,
          headline2,
          ...mappedCriterionToDb,
        },
        caller,
      });

      resolve(
        handleSuccess("SERVICE - Create Experiment Success", {
          ...newExperiment,
          name,
          content: contentKey,
          theme: themeKey,
          campaign: campaignData,
        })
      );
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  onGetAccountExperiments,
  onCreateExperiment,
};

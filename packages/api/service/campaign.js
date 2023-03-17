const { onGet: onGetAccount } = require("../data/account");
const { onGetWithThemeAndCampaignByAccountRef } = require("../data/experiment");
const { onCreate: onCreateCampaign } = require("../data/campaign");
const { onCreate: onCreateReport } = require("../data/campaign");
const { chargeCustomer } = require("../utils/stripe");
const config = require("../utils/config");
const { logger, handleSuccess } = require("../utils/utils");
const { sendAlert } = require("../utils/alert");
const {
  mapCriterionsToDb,
  mapKeywordsToCriterionToCreate,
  mapExperimentToCampaignBudget,
  mapExperimentToCampaign,
  mapExperimentToAdGroup,
  mapExperimentToAdGroupAd,
} = require("../utils/campaign");
const {
  createCampaign,
  createBudget,
  createAdGroup,
  createAdGroupAd,
  createAdGroupCriterion,
} = require("../utils/googleAds");

/**
 * @description Creates an campaign in google ads
 * @param {*} param0
 * @returns
 */
const onCreate = ({
  data: {
    decodedToken: {
      data: { accountRef },
    },
    budget,
    experimentRef,
    description,
    description2,
    headline,
    headline2,
    headline3,
    endDate,
    keywords,
    keywordOptimiser,
  },
  caller,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const { data: accountData } = await onGetAccount({
        data: { accountRef },
        caller,
      });

      const { payment_customer_id, test_account } = accountData[0];

      const {
        data: { experiments },
      } = await onGetWithThemeAndCampaignByAccountRef({
        caller,
        data: { accountRef, experimentRef },
      });

      const { name: domain } = experiments[0];

      if (test_account === 0) {
        await chargeCustomer({
          customerId: payment_customer_id,
          amount: budget,
          caller,
          accountRef,
          description: `Creating campaign for experiment ${experimentRef} with domain ${domain}`,
        });
      }

      logger.info(
        {
          budget,
          headline,
          headline2,
          headline3,
          keywords,
          experimentRef,
          accountRef,
          domain,
          caller,
        },
        "========= CONFIGURING CAMPAIGN  ========="
      );

      const { resource_name: budgetName } = await createBudget(
        mapExperimentToCampaignBudget({
          budget,
          experimentRef,
          name: `${domain}-${caller}`,
        })
      );

      logger.info({ budgetName }, "========= BUDGET CREATED  =========");

      const { id: google_ads_campaign_id, resource_name: campaignName } =
        await createCampaign(
          mapExperimentToCampaign({
            experimentRef,
            budgetName,
            endDate,
            name: `${domain}-${caller}`,
          })
        );

      logger.info({ campaignName }, "========= CAMPAIGN CREATED  =========");

      await onCreateReport({ experimentRef, google_ads_campaign_id });

      logger.info({ campaignName }, "========= REPORT CREATED  =========");

      const { resource_name: adGroupName } = await createAdGroup(
        mapExperimentToAdGroup({
          campaignName,
          budget,
          experimentRef,
          name: `${domain}-${caller}`,
        })
      );

      logger.info({ adGroupName }, "========= AD GROUP CREATED  =========");

      const { resource_name: adGroupAdName } = await createAdGroupAd(
        mapExperimentToAdGroupAd({
          name: domain,
          adGroupName,
          description,
          description2,
          headline,
          headline2,
          headline3,
          headline3,
        })
      );

      logger.info(
        { adGroupAdName },
        "========= AD GROUP AD CREATED  ========="
      );

      const keywordCriterians = mapKeywordsToCriterionToCreate({
        keywords,
        adGroupName,
      });

      const criterions = await createAdGroupCriterion(keywordCriterians);

      logger.info({ criterions }, "========= CRITERIONS CREATED  =========");

      const mappedCriterionToDb = mapCriterionsToDb({
        criterions,
        keywords,
      });

      const { data: campaignCreated } = await onCreateCampaign({
        data: {
          accountRef,
          googleAdsCampaignId: google_ads_campaign_id,
          experimentRef,
          campaignName,
          budgetName,
          adGroupName,
          adGroupAdName,
          headline,
          headline2,
          headline3,
          description,
          description2,
          keywordOptimiser,
          endDate: parseInt(endDate),
          ...mappedCriterionToDb,
        },
        caller,
      });

      const campaign = {
        ...campaignCreated,
        leads: [],
        metrics: {
          clicks: 0,
          impressions: 0,
          average_cpm: 0,
          average_cpc: 0,
          cost_micros: 0,
          engagements: 0,
          gmail_forwards: 0,
        },
      };

      logger.info(campaign, "=========  CAMPAIGN CONFIGURED  =========");

      try {
        await sendAlert({
          channel: config.slack.experimentDeployChannel,
          text: JSON.stringify({
            message: "Campaign Deployed",
            caller,
            experimentRef,
            domain,
          }),
        });
      } catch (e) {
        logger.warn(e);
      }

      resolve(
        handleSuccess("SERVICE - Create Campaign Success", {
          campaign,
        })
      );
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  onCreate,
};

const config = require("./utils/config");
const { logger } = require("./utils/utils");
const { sendAlert } = require("./utils/alert");
const {
  mapCriterionsToDb,
  mapKeywordsToCriterionToCreate,
  mapExperimentToCampaignBudget,
  mapExperimentToCampaign,
  mapExperimentToAdGroup,
  mapExperimentToAdGroupAd,
} = require("./utils/campaign");
const {
  createCampaign,
  createBudget,
  createAdGroup,
  createAdGroupAd,
  createAdGroupCriterion,
} = require("./utils/googleAds");
const { onCreate: onCreateCampaign } = require("./data/campaign");

const main = async () => {

  const {
    experiment: {
      budget,
      headline,
      headline2,
      description,
      keywords,
      experimentRef,
      accountRef,
      domain,
      endDate,
    },
    caller='test',
  } = config;

  try {
    logger.info(
      {
        budget,
        headline,
        headline2,
        keywords,
        experimentRef,
        accountRef,
        domain,
        endDate,
        caller,
      },
      "========= CONFIGURING CAMPAIGN  ========="
    );
  
    const { resource_name: budgetName } = await createBudget(
      mapExperimentToCampaignBudget({
        budget,
        accountRef,
        experimentRef,
        name: `${domain}_${caller}`,
      })
    );

    logger.info({ budgetName }, "========= BUDGET CREATED  =========");
  
    const { resource_name: campaignName } = await createCampaign(
      mapExperimentToCampaign({
        accountRef,
        experimentRef,
        budgetName,
        endDate,
        name: `${domain}_${caller}`,
      })
    );

    logger.info({ campaignName }, "========= CAMPAIGN CREATED  =========");
  
    const { resource_name: adGroupName } = await createAdGroup(
      mapExperimentToAdGroup({
        campaignName,
        budget,
        experimentRef,
        accountRef,
        name: `${domain}_${caller}`,
      })
    );

    logger.info({ adGroupName }, "========= AD GROUP CREATED  =========");
  
    const { resource_name: adGroupAdName } = await createAdGroupAd(
      mapExperimentToAdGroupAd({
        name: domain,
        adGroupName,
        description,
        headline,
        headline2,
      })
    );
      
    logger.info({ adGroupAdName }, "========= AD GROUP AD CREATED  =========");

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
   
    await onCreateCampaign({
      data: {
        accountRef,
        experimentRef,
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
  
    logger.info(
      { experimentRef, domain },
      "=========  CAMPAIGN CONFIGURED  ========="
    );

    await sendAlert({ channel: config.slack.experimentDeployChannel, text: JSON.stringify({
      message: "Experiment Deployed",
      caller,
      experimentRef,
      domain
    }) })
  } catch (error) {
    logger.error(error);
    await sendAlert({ text: JSON.stringify({
      error,
      caller,
      experimentRef,
      domain
    }) }).then(() => process.exit(1))
  }
};

try {
  main().then(process.exit);
} catch (error) {
  logger.error(error);
  sendAlert({ text: JSON.stringify(error) }).then(() => process.exit(1))
}

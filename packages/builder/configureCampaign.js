const config = require("./utils/config");
const { logger } = require("./utils/utils");
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
      domainRef,
      headline,
      headline2,
      description,
      keyword0,
      keyword1,
      keyword2,
      keyword3,
      keyword4,
      keyword5,
      experimentRef,
      accountRef,
      domain,
      endDate,
    },
    caller='test',
  } = config;
  logger.info(
    {
      budget,
      domainRef,
      headline,
      headline2,
      keyword0,
      keyword1,
      keyword2,
      keyword3,
      keyword4,
      keyword5,
      experimentRef,
      accountRef,
      domain,
      endDate,
      caller,
    },
    "========= CONFIGURING CAMPAIGN  ========="
  );

  const keywords = [keyword0, keyword1, keyword2, keyword3, keyword4, keyword5];

  const { resource_name: budgetName } = await createBudget(
    mapExperimentToCampaignBudget({
      budget,
      accountRef,
      domainRef,
      experimentRef,
      name: `${domain}_${caller}`,
    })
  );

  const { resource_name: campaignName } = await createCampaign(
    mapExperimentToCampaign({
      accountRef,
      experimentRef,
      budgetName,
      domainRef,
      endDate,
      name: `${domain}_${caller}`,
    })
  );

  const { resource_name: adGroupName } = await createAdGroup(
    mapExperimentToAdGroup({
      campaignName,
      budget,
      experimentRef,
      accountRef,
      domainRef,
      name: `${domain}_${caller}`,
    })
  );

  const { resource_name: adGroupAdName } = await createAdGroupAd(
    mapExperimentToAdGroupAd({
      name: domain,
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
 
  await onCreateCampaign({
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

  logger.info(
    { experimentRef, domain },
    "=========  CAMPAIGN CONFIGURED  ========="
  );
};

try {
  main().then(process.exit);
} catch (error) {
  logger.error(error);
  process.exit(1);
}

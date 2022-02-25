const { GoogleAdsApi, enums, toMicros, fromMicros } = require("google-ads-api");
const config = require("./config");
const { logger } = require("./utils");
const {
  campaignBudget: campaignBudgetMock,
  campaign: campaignMock,
  adGroup: adGroupMock,
  adGroupAd: adGroupAdMock,
  adGroupCriterion: adGroupCriterionMock,
} = require("./mocks/googleAds");

/**
 * Object Hierarchy: https://developers.google.com/adwords/api/docs/guides/objects-methods
 */

const metricMap = {
  clicks: "metrics.clicks",
  impressions: "metrics.impressions",
};

/**
 * https://opteo.com/dev/google-ads-api/#authentication
 * https://console.cloud.google.com/apis/credentials?highlightClient=541455512087-4b4kco7v5ajd7sae6m44f0sd5qac6hqt.apps.googleusercontent.com&project=idea-camels&supportedpurview=project
 * https://opteo.com/dev/google-ads-api/#ad
 */

const client = new GoogleAdsApi({
  client_id: config.googleAds.clientId,
  client_secret: config.googleAds.clientSecret,
  developer_token: config.googleAds.developerToken,
});

const customer = client.Customer({
  customer_id: "5213472317",
  refresh_token: config.googleAds.refreshToken,
  logging: { verbosity: !config.isProd ? "info" : "debug" },
  // login_customer_id: '5465623599'
});

/**
 * @description https://opteo.com/dev/google-ads-api/#create-campaign
 * @param {name, budget, status } param0
 */
const createCampaign = async (campaign) => {
  if (config.noInternet) {
    logger.info("NO INTERNET TO CREATE CAMPAIGN");
    return {};
  }

  const { results } = await customer.campaigns.create(
    [{ ...campaign, target_spend: {} }],
    { validate_only: !config.isProd }
  );

  return config.isProd ? results[0] : campaignMock;
};

/**
 * @description https://opteo.com/dev/google-ads-api/#update-campaign
 * @param {name, budget, type, status } param0
 */
const updateCampaign = async (campaign, customerProvider = customer) => {
  if (config.noInternet) {
    logger.info("NO INTERNET TO UPDATE CAMPAIGN");
    return {};
  }

  const { results } = await customerProvider.campaigns.update(campaign, {
    validate_only: !config.isProd,
  });

  return config.isProd ? results[0] : campaignMock;
};

/**
 * @description https://opteo.com/dev/google-ads-api/#get-campaign
 */
const getCampaign = async (resourceName) => {
  if (config.noInternet) {
    logger.info("NO INTERNET TO LIST CAMPAIGNS");
    return [];
  }

  return await customer.campaigns.get(resourceName);
};

/**
 * @description https://opteo.com/dev/google-ads-api/#delete-campaign
 */
const deleteCampaign = async (name) => {
  if (config.noInternet) {
    logger.info("NO INTERNET TO DELETE CAMPAIGN");
    return {};
  }

  return await customer.campaigns.delete(name, {
    validate_only: !config.isProd,
  });
};

/**
 * @description https://opteo.com/dev/google-ads-api/#campaignbudget
 * Check out budgets at: https://ads.google.com/aw/budgets?ocid=578971088&workspaceId=0&euid=426173980&__u=4645609020&uscid=578971088&__c=7184293712&authuser=0
 */
const createBudget = async (budget) => {
  if (config.noInternet) {
    logger.info("NO INTERNET TO CREATE BUDGET");
    return {};
  }

  const { results } = await customer.campaignBudgets.create([budget], {
    validate_only: !config.isProd,
  });

  return config.isProd ? results[0] : campaignBudgetMock;
};

/**
 * @description https://opteo.com/dev/google-ads-api/#get-campaignbudget
 */
const getBudget = async (resourceName) => {
  if (config.noInternet) {
    logger.info("NO INTERNET TO LIST BUDGETS");
    return [];
  }

  return await customer.campaignBudgets.get(resourceName);
};

/**
 * @description https://opteo.com/dev/google-ads-api/#delete-campaignbudget
 */
const deleteBudget = async (name) => {
  if (config.noInternet) {
    logger.info("NO INTERNET TO DELETE BUDGET");
    return {};
  }

  return await customer.campaignBudgets.delete(name, {
    validate_only: !config.isProd,
  });
};

/**
 * @description https://opteo.com/dev/google-ads-api/#create-adgroup
 * @param { campaign, maxCostPerClick, maxCostPer1000Impressions, status, type } param0
 */
const createAdGroup = async (adGroup) => {
  if (config.noInternet) {
    logger.info("NO INTERNET TO CREATE ADGROUP");
    return {};
  }

  const { results } = await customer.adGroups.create([adGroup], {
    validate_only: !config.isProd,
  });

  return config.isProd ? results[0] : adGroupMock.resource_name;
};

/**
 * @description https://opteo.com/dev/google-ads-api/#update-adgroup
 * @param { campaign, maxCostPerClick, maxCostPer1000Impressions, status, type } param0
 */
const updateAdGroup = async (adGroup) => {
  if (config.noInternet) {
    logger.info("NO INTERNET TO UPDATE ADGROUP");
    return {};
  }

  const { results } = await customer.adGroups.update(adGroup, {
    validate_only: !config.isProd,
  });

  return config.isProd ? results[0] : adGroupMock;
};

/**
 * @description https://opteo.com/dev/google-ads-api/#create-adgroupad
 * @param { ad, adGroup, adStrength, policySummary, resourceName, type } param0
 */
const createAdGroupAd = async (adGroupAd) => {
  if (config.noInternet) {
    logger.info("NO INTERNET TO CREATE ADGROUPAD");
    return {};
  }

  const { results } = await customer.adGroupAds.create([adGroupAd], {
    validate_only: !config.isProd,
  });

  return config.isProd ? results[0] : adGroupAdMock.resource_name;
};

/**
 * @description https://opteo.com/dev/google-ads-api/#update-adgroupad
 * @param { ad, adGroup, adStrength, policySummary, resourceName, type } param0
 */
const updateAdGroupAd = async (adGroupAd) => {
  if (config.noInternet) {
    logger.info("NO INTERNET TO UPDATE ADGROUPAD");
    return {};
  }

  const { results } = await customer.adGroupAds.update(adGroupAd, {
    validate_only: !config.isProd,
  });

  return config.isProd ? results[0] : adGroupAdMock;
};

/**
 * @description https://opteo.com/dev/google-ads-api/#create-adgroupcriterion
 * @param { campaign, maxCostPerClick, maxCostPer1000Impressions, status, type } param0
 */
const createAdGroupCriterion = async (adGroupCriterions) => {
  if (config.noInternet) {
    logger.info("NO INTERNET TO CREATE AD GROUP CRITERIAN");
    return {};
  }

  const { results } = await customer.adGroupCriteria.create(adGroupCriterions, {
    validate_only: !config.isProd,
  });

  return config.isProd ? results : [adGroupCriterionMock];
};

const getMetrics = async ({
  metrics = ["clicks"],
  orderBy = "clicks",
  adGroupResourceName,
} = {}) => {
  if (config.noInternet) {
    logger.info("NO INTERNET TO GET AGGROUP METRICS");
    return {};
  }

  const mappedMetrics = metrics.map((o) => metricMap[o]);

  const body = {
    entity: "ad_group",
    attributes: [
      "ad_group.id",
      "ad_group.name",
      "ad_group.status",
      "ad_group.resource_name",
    ],
    metrics: mappedMetrics,
    order_by: metricMap[orderBy],
    order: [{ field: "ad_group.id", sort_order: "DESC" }],
  };

  if (adGroupResourceName) {
    body.constraints = [
      { key: "ad_group.resource_name", op: "=", val: adGroupResourceName },
    ];
  }

  const response = await customer.report(body);

  return response;
};

const createAdPayload = ({
  adDescription,
  adHeadlinePart1,
  adHeadlinePart2,
  domain,
}) => ({
  added_by_google_ads: false,
  device_preference: 0,
  expanded_text_ad: {
    description: adDescription,
    headline_part1: adHeadlinePart1,
    headline_part2: adHeadlinePart2,
  },
  final_urls: [`https://${domain}`],
  final_app_urls: [],
  final_mobile_urls: [],
  url_collections: [],
  url_custom_parameters: [],
});

module.exports = {
  createCampaign,
  updateCampaign,
  getCampaign,
  createBudget,
  deleteCampaign,
  deleteBudget,
  getBudget,
  createAdGroup,
  updateAdGroup,
  createAdGroupCriterion,
  createAdGroupAd,
  updateAdGroupAd,
  getMetrics,
  createAdPayload,
  toMicros,
  fromMicros,
  enums,
};

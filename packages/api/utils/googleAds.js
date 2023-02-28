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
  average_cpm: "metrics.average_cpm",
  average_cpc: "metrics.average_cpc",
  combined_clicks: "metrics.combined_clicks",
  cost_micros: "metrics.cost_micros",
  engagements: "metrics.engagements",
  gmail_forwards: "metrics.gmail_forwards",
  optimization_score_uplift: "metrics.optimization_score_uplift",
  organic_clicks: "metrics.organic_clicks",
  organic_impressions: "metrics.organic_impressions",
  speed_score: "metrics.speed_score",
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
  customer_id: config.googleAds.customerIdSplit,
  refresh_token: config.googleAds.refreshToken,
  logging: { verbosity: !config.isProd ? "info" : "debug" },
});

/**
 * @description https://opteo.com/dev/google-ads-api/#create-campaign
 * @param {name, budget, status } param0
 */
const createCampaign = async (campaign) => {
  if (config.noInternet) {
    logger.info("NO INTERNET TO CREATE CAMPAIGN");
    return campaignMock;
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
    return campaignMock;
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
    return [campaignMock];
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
    return [campaignBudgetMock];
  }

  return await customer.campaignBudgets.get(resourceName);
};

/**
 * @description https://opteo.com/dev/google-ads-api/#delete-campaignbudget
 */
const deleteBudget = async (name) => {
  if (config.noInternet) {
    logger.info("NO INTERNET TO DELETE BUDGET");
    return campaignBudgetMock;
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
    return adGroupMock.resource_name;
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
    return adGroupMock.resource_name;
  }

  const { results } = await customer.adGroups.update(adGroup, {
    validate_only: !config.isProd,
  });

  return config.isProd ? results[0] : adGroupMock.resource_name;
};

/**
 * @description https://opteo.com/dev/google-ads-api/#create-adgroupad
 * @param { ad, adGroup, adStrength, policySummary, resourceName, type } param0
 */
const createAdGroupAd = async (adGroupAd) => {
  if (config.noInternet) {
    logger.info("NO INTERNET TO CREATE ADGROUPAD");
    return adGroupAdMock.resource_name;
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
    return adGroupAd;
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
    return [adGroupCriterionMock];
  }

  const { results } = await customer.adGroupCriteria.create(adGroupCriterions, {
    validate_only: !config.isProd,
  });

  return config.isProd ? results : [adGroupCriterionMock];
};

/**
 * @description fetches metrics on a list of ads
 * list of metrics found here https://developers.google.com/google-ads/api/fields/v8/metrics
 * 
 * Some example metrics available: average_cpc
average_cpm average cost per 000 impressions
combined_clicks The number of times your ad or your site's listing in the unpaid results was clicked. See the help page at https://support.google.com/google-ads/answer/3097241 for details.
cost_micros 	The sum of your cost-per-click (CPC) and cost-per-thousand impressions (CPM) costs during this period.
engagements = 	The number of engagements. An engagement occurs when a viewer expands your Lightbox ad. Also, in the future, other ad types may support engagement metrics.
gmail_forwards 	The number of times the ad was forwarded to someone else as a message.
optimization_score_uplift Total optimization score uplift of all recommendations.
organic_clicks The number of times someone clicked your site's listing in the unpaid results for a particular query. See the help page at https://support.google.com/google-ads/answer/3097241 for details.
organic_impressions 	The number of listings for your site in the unpaid search results. See the help page at https://support.google.com/google-ads/answer/3097241 for details.
search_rank_lost_impression_share 	The estimated percentage of impressions on the Search Network that your ads didn't receive due to poor Ad Rank. Note: Search rank lost impression share is reported in the range of 0 to 0.9. Any value above 0.9 is reported as 0.9001.
speed_score A measure of how quickly your page loads after clicks on your mobile ads. The score is a range from 1 to 10, 10 being the fastest.
 */
const getMetrics = async ({
  metrics = ["clicks", "metrics.impressions"],
  orderBy = "clicks",
  adGroupResourceName = [],
} = {}) => {
  if (config.noInternet) {
    logger.info("NO INTERNET TO GET AGGROUP METRICS");
    return [];
  }

  if (adGroupResourceName.length === 0) return [];

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
      { key: "ad_group.resource_name", op: "IN", val: adGroupResourceName },
    ];
  }

  const response = await customer.report(body);
  logger.info(response, "GOOGLE_ADS_REPORT_FOUND");
  return response;
};

/**
 * @description creates a payload to send to create an ad
 */
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

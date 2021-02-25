const { GoogleAdsApi, enums, toMicros, fromMicros } = require("google-ads-api");
const config = require("./config");
const { reverseObjectKeyValues, changeKeys } = require("./utils");
const { campaignBudget: campaignBudgetMock, campaign: campaignMock, adGroup: adGroupMock, adGroupAd: adGroupAdMock } = require("./mocks/googleAds");

/**
 * Object Hierarchy: https://developers.google.com/adwords/api/docs/guides/objects-methods
 */

// https://opteo.com/dev/google-ads-api/#budget
const budgetMap = {
  amount_micros: "amountMicros",
  delivery_method: "deliveryMethod",
  name: "name",
};

const budgetMapReversed = reverseObjectKeyValues(budgetMap);

// https://opteo.com/dev/google-ads-api/#campaign
const campaignMap = {
  advertising_channel_type: "advertisingChannelType",
  bidding_strategy_type: "biddingStrategyType",
  campaign_budget: "campaignBudget",
  end_date: 'endDate',
  name: 'name',
  paymentMode: 'paymentMode',
  start_date: 'startDate',
  status: 'status',
  target_spend: "targetSpend"
};

const adGroupMap = {
  campaign: 'campaign', //campaign name (required)
  cpc_bid_micros: 'maxCostPerClick', // max cost per click (required)
  cpm_bid_micros: 'maxCostPer1000Impressions', // mac cost per 1,000 impression (required)
  id: 'id', //ad group id (output)
  name: 'name', // ad group name (required)
  resource_name: 'resourceName', // name of ad group (output)
  status: 'status', // enums.AdGroupAdStatus (required)
  type: 'type', // enums.AdGroupType (required) 2 is SEARCH_STANDARD
}

const adGroupMapReversed = reverseObjectKeyValues(adGroupMap);

const adGroupAdMap = {
  ad: 'ad', // the ad object (required)
  ad_group: 'adGroup', // name of ad_group (output)
  ad_strength: 'adStrength',
  policy_summary: 'policySummary', // information on policy for the ad. Has status of whether it has been approved or not.
  resource_name: 'resourceName',
  status: 'type', // enums.AdGroupAdStatus (required)
}

const adGroupAdMapReversed = reverseObjectKeyValues(adGroupAdMap);

const metricMap = {
  'clicks': 'metrics.clicks',
  'impressions': 'metrics.impressions'
}

const campaignMapReversed = reverseObjectKeyValues(campaignMap);

/**
 * https://opteo.com/dev/google-ads-api/#authentication
 * https://console.cloud.google.com/apis/credentials?highlightClient=541455512087-4b4kco7v5ajd7sae6m44f0sd5qac6hqt.apps.googleusercontent.com&project=idea-camels&supportedpurview=project
 * https://opteo.com/dev/google-ads-api/#ad
 */

const client = new GoogleAdsApi({
    client_id: config.googleAds.clientId,
    client_secret: config.googleAds.clientSecret,
    developer_token: config.googleAds.developerToken
})

const customer = client.Customer({
    customer_account_id: config.googleAds.customerId,
    refresh_token: config.googleAds.refreshToken,
    logging: { verbosity: !config.isProd ? "info" : "debug" }
})

/**
 * @description https://opteo.com/dev/google-ads-api/#create-campaign
 * @param {name, budget, status } param0 
 */
const createCampaign = async campaign => {
  
  const { results } = await customer.campaigns.create({ ...changeKeys(campaign, campaignMapReversed), target_spend: {}}, { validate_only: !config.isProd });

  return config.isProd ? results[0] : campaignMock.resource_name;
};

/**
 * @description https://opteo.com/dev/google-ads-api/#update-campaign
 * @param {name, budget, type, status } param0 
 */
const updateCampaign = async campaign => {

  const { results } = await customer.campaigns.update(changeKeys(campaign, campaignMapReversed), { validate_only: !config.isProd });

  return config.isProd ? results[0] : campaignMock;
};

/**
 * @description https://opteo.com/dev/google-ads-api/#list-campaignbudget
 */
const listCampaigns = async () => await customer.customerClients.list();

/**
 * @description https://opteo.com/dev/google-ads-api/#delete-campaign
 */
const deleteCampaign = async name => await customer.campaigns.delete(name, { validate_only: !config.isProd });

/**
 * @description https://opteo.com/dev/google-ads-api/#campaignbudget
 */
const createBudget = async budget => {  
  const { results } = await customer.campaignBudgets.create(changeKeys(budget, budgetMapReversed), { validate_only: !config.isProd })

  return config.isProd ? results[0] : campaignBudgetMock.resource_name;
}

/**
 * @description https://opteo.com/dev/google-ads-api/#list-campaignbudget
 */
const listBudgets = async () => await customer.campaignBudgets.list()

/**
 * @description https://opteo.com/dev/google-ads-api/#delete-campaignbudget
 */
const deleteBudget = async name => await customer.campaignBudgets.delete(name, { validate_only: !config.isProd });

/**
 * @description https://opteo.com/dev/google-ads-api/#create-adgroup
 * @param { campaign, maxCostPerClick, maxCostPer1000Impressions, status, type } param0 
 */
const createAdGroup = async adGroup => {

  const { results } = await customer.adGroups.create(changeKeys(adGroup, adGroupMapReversed), { validate_only: !config.isProd });

  return config.isProd ? results[0] : adGroupMock.resource_name;
};

/**
 * @description https://opteo.com/dev/google-ads-api/#update-adgroup
 * @param { campaign, maxCostPerClick, maxCostPer1000Impressions, status, type } param0 
 */
const updateAdGroup = async adGroup => {

  const { results } = await customer.adGroups.update(changeKeys(adGroup, adGroupMapReversed), { validate_only: !config.isProd });

  return config.isProd ? results[0] : adGroupMock;
};

/**
 * @description https://opteo.com/dev/google-ads-api/#create-adgroupad
 * @param { ad, adGroup, adStrength, policySummary, resourceName, type } param0 
 */
const createAdGroupAd = async adGroupAd => {
  const { results } = await customer.adGroupAds.create(changeKeys(adGroupAd, adGroupAdMapReversed), { validate_only: !config.isProd });
  
  return config.isProd ? results[0] : adGroupAdMock.resource_name;
};

/**
 * @description https://opteo.com/dev/google-ads-api/#update-adgroupad
 * @param { ad, adGroup, adStrength, policySummary, resourceName, type } param0 
 */
const updateAdGroupAd = async adGroupAd => {

  const { results } = await customer.adGroupAds.update(changeKeys(adGroupAd, adGroupAdMapReversed), { validate_only: !config.isProd });

  return config.isProd ? results[0] : adGroupAdMock;
};

const getMetrics = async ({ metrics, orderBy, adGroupResourceName }) => {

  const mappedMetrics = metrics.map(o => metricMap[o]);

  const response = await customer.report({
      entity: 'ad_group', 
      attributes: ['ad_group.id', 'ad_group.name', 'ad_group.status', 'ad_group.resource_name'], 
      metrics: mappedMetrics,
      order_by: metricMap[orderBy], 
      sort_order: 'desc',
      constraints: [{ key: 'ad_group.resource_name', op: '=', val: adGroupResourceName }]
  })

  return response;
}

const createAdPayload = ({ 
  adDescription,
  adHeadlinePart1,
  adHeadlinePart2,
  domain
}) => ({
  added_by_google_ads: false,
  device_preference: 0,
  expanded_text_ad: {
    description: adDescription,
    headline_part1: adHeadlinePart1,
    headline_part2: adHeadlinePart2
  },
  final_urls: [`https://${domain}`],
  final_app_urls: [],
  final_mobile_urls: [],
  url_collections: [],
  url_custom_parameters: []
});

module.exports = {
  createCampaign,
  updateCampaign,
  listCampaigns,
  createBudget,
  deleteCampaign,
  deleteBudget,
  listBudgets,
  createAdGroup,
  updateAdGroup,
  createAdGroupAd,
  updateAdGroupAd,
  getMetrics,
  createAdPayload,
  toMicros,
  fromMicros,
  enums
};

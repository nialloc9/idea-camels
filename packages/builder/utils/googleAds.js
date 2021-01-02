const { GoogleAdsApi, enums } = require("google-ads-api");
const config = require("./config");
const { reverseObjectKeyValues, changeKeys } = require("./utils");

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
})

/**
 * @description https://opteo.com/dev/google-ads-api/#create-campaign
 * @param {name, budget, type, status } param0 
 */
const createCampaign = async campaign => {

  const { results } = await customer.campaigns.update(changeKeys(campaign, campaignMapReversed), { validate_only: !config.isProd });

  return results;
};

/**
 * @description https://opteo.com/dev/google-ads-api/#update-campaign
 * @param {name, budget, type, status } param0 
 */
const updateCampaign = async campaign => {

  const { results } = await customer.campaigns.create(changeKeys(campaign, campaignMapReversed), { validate_only: !config.isProd });

  return results;
};

/**
 * @description https://opteo.com/dev/google-ads-api/#list-campaignbudget
 */
const listCampaigns = async () => await customer.customerClients.list();

/**
 * @description https://opteo.com/dev/google-ads-api/#campaignbudget
 */
const createBudget = async budget => {  
  try {
    const { results } = await customer.campaignBudgets.create(changeKeys(budget, budgetMapReversed), { validate_only: !config.isProd })

    return results;
  } catch (e) {
      console.error(e)
  }
}
module.exports = {
  createCampaign,
  updateCampaign,
  listCampaigns,
  createBudget,
  enums
};

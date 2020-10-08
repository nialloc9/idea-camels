const { GoogleAdsApi } = require("google-ads-api");
const config = require("./config");

/**
 * https://opteo.com/dev/google-ads-api/#authentication
 * https://console.cloud.google.com/apis/credentials?highlightClient=541455512087-4b4kco7v5ajd7sae6m44f0sd5qac6hqt.apps.googleusercontent.com&project=idea-camels&supportedpurview=project
 */
console.log(config);
const client = new GoogleAdsApi({
  client_id: config.googleAds.clientId,
  client_secret: config.googleAds.clientSecret,
  developer_token: config.googleAds.developerToken,
});

const customer = client.Customer({
  customer_account_id: config.googleAds.customerId,
  refresh_token: config.googleAds.refreshToken,
});

const createCampaign = async ({ name, budget, type, status }) => {
  const { results } = await customer.campaigns.create({
    name,
    campaign_budget: budget,
    advertising_channel_type: type,
    status,
  });

  return results;
};

const listCampaigns = () => customer.campaigns.list();

module.exports = {
  createCampaign,
  listCampaigns,
};

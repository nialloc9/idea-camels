const { GoogleAdsApi, enums } = require("google-ads-api");
const config = require("./config");
const { logger } = require("./utils");

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

// const client = new GoogleAdsApi({
//   client_id: config.googleAds.clientId,
//   client_secret: config.googleAds.clientSecret,
//   developer_token: config.googleAds.developerToken,
// });

// const customer = client.Customer({
//   customer_account_id: config.googleAds.customerId,
//   refresh_token: config.googleAds.refreshToken,
// });

// const createCampaign = async ({ name, budget, type, status }) => {
//   if (config.noInternet) {
//     logger.warn("warn", "========= SIMULATION - campaign created =========");
//     return {};
//   }

//   const { results } = await customer.campaigns.create({
//     name,
//     campaign_budget: budget,
//     advertising_channel_type: type,
//     status,
//   });

//   return results;
// };

console.log({
    lient_id: config.googleAds.clientId,
  client_secret: config.googleAds.clientSecret,
  developer_token: config.googleAds.developerToken,
    customer_account_id: "776-083-777",
    refresh_token: config.googleAds.refreshToken,
  })
const listCampaigns = async () => await customer.customerClients.list();
/**
 * https://opteo.com/dev/google-ads-api/#campaignbudget
 */
const createBudget = async () => {
    // Creating the entity

    
    const campaign_budget = {
        amount_micros: '12000000',
        delivery_method: '2',
        name: 'dnjkasfkjnaddfnjkadnbjkas gmkflsgklmfamklgkl mfskt4535'
    }
  
  // Passing in a single entity to create
  try {
    const result = await customer.campaignBudgets.create([campaign_budget], {validate_only: true})

    console.log(result)
  } catch (e) {
      console.error(e)
  }
}
module.exports = {
//   createCampaign,
  listCampaigns,
  createBudget,
  enums
};

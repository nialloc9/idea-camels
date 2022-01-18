const { ping } = require("../utils/database");
const {
  listBudgets,
  listCampaigns,
  getMetrics,
} = require("../utils/googleAds");
const { handleSuccess } = require("../utils/utils");

const onHealthCheck = () =>
  new Promise(async (resolve) => resolve(handleSuccess("okay")));

const onDBHealthCheck = () =>
  new Promise(async (resolve, reject) => {
    try {
      await ping();
      resolve(handleSuccess("okay"));
    } catch (error) {
      reject(error);
    }
  });

const onGoogleAdsCheck = () =>
  new Promise(async (resolve, reject) => {
    try {
      await getMetrics();
      await listCampaigns();
      await listBudgets();
      resolve(handleSuccess("okay"));
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  onHealthCheck,
  onDBHealthCheck,
  onGoogleAdsCheck,
};

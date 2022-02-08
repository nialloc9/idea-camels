const { ping } = require("../utils/database");
const {
  listBudgets,
  listCampaigns,
  getMetrics,
} = require("../utils/googleAds");
const { handleSuccess, logger } = require("../utils/utils");

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
      logger.info("Metrics okay");
      await listCampaigns();
      logger.info("Campaigns okay");
      await listBudgets();
      logger.info("Budgets okay");
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

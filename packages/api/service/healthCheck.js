const { ping } = require("../utils/database");
const { getMetrics } = require("../utils/googleAds");
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
      logger.info("Starting google health checks");
      await getMetrics();
      logger.info("Metrics okay");
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

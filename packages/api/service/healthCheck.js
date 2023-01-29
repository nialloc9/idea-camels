const { ping } = require("../utils/database");
const { getMetrics } = require("../utils/googleAds");
const { handleSuccess, logger } = require("../utils/utils");
const config = require("../utils/config");
const { sendEmail } = require("../utils/mailer/mailer");
const { sendAlert } = require("../utils/alert");

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

const onEmailCheck = () =>
  new Promise(async (resolve, reject) => {
    try {
      logger.info("Starting email health checks");
      await sendEmail({
        to: config.company.support.email,
        from: config.company.support.email,
        subject: `Idea camels health check`,
        html: `<div>test</div>`,
      });
      logger.info("Email okay");
      resolve(handleSuccess("okay"));
    } catch (error) {
      reject(error);
    }
  });

const onAlertCheck = () =>
  new Promise(async (resolve, reject) => {
    try {
      logger.info("Starting alert health checks");
      const { error } = await sendAlert({
        channel: "api-prod-alerts",
        text: "test",
      });

      if (error) {
        return reject(error);
      }

      logger.info("Alert okay");
      resolve(handleSuccess("okay"));
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  onHealthCheck,
  onDBHealthCheck,
  onGoogleAdsCheck,
  onEmailCheck,
  onAlertCheck,
};

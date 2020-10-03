const AWS = require("aws-sdk");
const myql = require("mysql");
const config = require("../../utils/config");

const { registerDomain } = require("../../utils/aws");
const { query } = require("../../utils/database");
const { logger: log, handleSuccess } = require("../../utils/utils");
const errors = require("../../utils/errors");

const logger = log();

const {
  db: { host, user, password, database, port },
} = config;

// set region if not set (as not set by the SDK by default)
if (!AWS.config.region) {
  AWS.config.update({
    region: "us-east-1",
    profile: "idea-camels",
  });
}

const provider = new AWS.Route53Domains();

exports.purchaseDomain = async (event) => {
  const a = await query(
    "SELCT * FROM domains",
    undefined,
    "test",
    "purchaseDomain"
  );
  // const { caller, domain } = JSON.parse(event.body);

  // const response = {
  //   statusCode: 200,
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*", // Required for CORS support to work
  //     "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
  //   },
  // };

  // try {
  //   const { Availability: availability } = await registerDomain(provider, {
  //     domain,
  //   });

  //   const isAvailable = availability !== "UNAVAILABLE";

  //   response.body = handleSuccess({ isAvailable, domain, caller });

  //   logger.info("======================");
  //   logger.info(response);
  //   logger.info("======================");
  // } catch (error) {
  //   logger.error("======================");
  //   logger.error(error);
  //   logger.error("======================");

  //   response.statusCode = 500;

  //   response.body = errors[2001]({
  //     caller,
  //     endpoint: "purchaseDomain",
  //     data: {
  //       error,
  //     },
  //   });
  // } finally {
  //   return response;
  // }
};

const AWS = require("aws-sdk");
const testEvent = require("./event");
const { validateDomain: onValidateDoman } = require("../../utils/aws");
const { logger: log, handleSuccess } = require("../../utils/utils");
const errors = require("../../utils/errors");

const logger = log();

// set region if not set (as not set by the SDK by default)
if (!AWS.config.region) {
  AWS.config.update({
    region: "us-east-1",
    profile: "idea-camels",
  });
}

const provider = new AWS.Route53Domains();

exports.validateDomain = async (event) => {
  console.log("here", event);
  const { caller, domain } = JSON.parse(event.body);

  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    },
  };

  try {
    const { Availability: availability } = await onValidateDoman(provider, {
      domain,
    });

    const isAvailable = availability !== "UNAVAILABLE";

    response.body = handleSuccess({ isAvailable, domain, caller });

    logger.info("======================");
    logger.info(response);
    logger.info("======================");
  } catch (error) {
    logger.error("======================");
    logger.error(error);
    logger.error("======================");

    response.statusCode = 500;

    response.body = errors[2001]({
      caller,
      endpoint: "validateDomain",
      data: {
        error,
      },
    });
  } finally {
    return response;
  }
};

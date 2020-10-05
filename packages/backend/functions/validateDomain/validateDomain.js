const AWS = require("aws-sdk");
const { validateDomain: onValidateDoman } = require("../../utils/aws");
const { handleSuccess, logger } = require("../../utils/utils");
const { validateAndParse } = require("../../utils/security");
const errors = require("../../utils/errors");

AWS.config.update({
  region: "us-east-1",
});

const provider = new AWS.Route53Domains();

exports.validateDomain = async (event) => {
  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    },
  };

  try {
    const { caller, domain } = await validateAndParse({
      service: "validateDomain",
      event,
      required: ["caller", "domain"],
      isAuth: false,
    });

    const { Availability: availability } = await onValidateDoman(provider, {
      domain,
    });

    const isAvailable = availability !== "UNAVAILABLE";

    response.body = handleSuccess("domain available", {
      isAvailable,
      domain,
      caller,
    });
  } catch (error) {
    response.statusCode = 500;

    response.body = errors[2001]({
      caller: event.caller,
      endpoint: "validateDomain",
      data: {
        error,
      },
    });

    logger.error(response);
  }

  return response;
};

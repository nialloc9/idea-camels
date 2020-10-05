const AWS = require("aws-sdk");
const { registerDomain } = require("../../utils/aws");
const { handleSuccess, logger } = require("../../utils/utils");
const { validateAndParse } = require("../../utils/security");
const { query } = require("../../utils/database");
const errors = require("../../utils/errors");

AWS.config.update({
  region: "us-east-1",
});

const provider = new AWS.Route53Domains();

exports.purchaseDomain = async (event) => {
  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    },
  };

  try {
    const {
      caller,
      domain,
      decodedToken: { accountRef },
    } = await validateAndParse({
      service: "purchaseDomain",
      event,
      required: ["caller", "domain"],
    });

    await registerDomain(provider, {
      domain,
    });

    const data = {
      domain_name: domain.domainName,
      domain_ref: results.insertId,
      account_ref: accountRef,
    };

    const results = await query(`INSERT INTO domains SET ?`, data, caller);

    response.body = handleSuccess(`${domain} purchased`, {
      domain: { ...data, domain_ref: results.insertId },
      caller,
    });
  } catch (error) {
    response.statusCode = 500;

    response.body = errors[2001]({
      caller: event.caller,
      endpoint: "purchaseDomain",
      data: {
        error,
      },
    });

    logger.error(response);
  }

  return response;
};

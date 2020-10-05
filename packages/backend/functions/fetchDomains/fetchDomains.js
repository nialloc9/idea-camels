const { handleSuccess, logger } = require("../../utils/utils");
const { query } = require("../../utils/database");
const errors = require("../../utils/errors");
const { validateAndParse } = require("../../utils/security");

exports.fetchDomains = async (event) => {
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
      decodedToken: { accountRef },
    } = await validateAndParse({
      service: "fetchDomain",
      event,
      required: ["caller"],
    });

    const domains = query(
      `SELECT * FROM domains WHERE account_ref=${accountRef};`,
      undefined,
      "fetchDomains"
    );

    response.body = handleSuccess("domains found", {
      domains,
      accountRef,
      caller,
    });
  } catch (error) {
    response.statusCode = 500;

    response.body = errors[2001]({
      caller: event.caller,
      endpoint: "fetchDomains",
      data: {
        error,
      },
    });

    logger.error(response);
  }

  return response;
};

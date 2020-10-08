const { handleSuccess, logger } = require("../../utils/utils");
const { query } = require("../../utils/database");
const errors = require("../../utils/errors");
const { validateAndParse } = require("../../utils/security");

exports.fetchExperiments = async (event) => {
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
      service: "fetchExperiments",
      event,
      required: ["caller"],
    });

    const experiments = await query(
      `SELECT * FROM experiments WHERE account_ref=${accountRef};`,
      undefined,
      "fetchExperiments"
    );

    response.body = handleSuccess("experiments found", {
      experiments,
      accountRef,
      caller,
    });
  } catch (error) {
    response.statusCode = 500;

    response.body = errors[2001]({
      caller: event.caller,
      endpoint: "fetchExperiments",
      data: {
        error,
      },
    });

    logger.error(response);
  }

  return response;
};

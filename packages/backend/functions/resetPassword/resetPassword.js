const { handleSuccess, logger } = require("../../utils/utils");
const { query } = require("../../utils/database");
const { createHash, validateAndParse } = require("../../utils/security");
const errors = require("../../utils/errors");

exports.resetPassword = async (event) => {
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
      password,
      decodedToken: { accountRef },
    } = await validateAndParse({
      service: "resetPassword",
      event,
      required: ["password", "caller"],
    });

    await query(
      `UPDATE accounts SET password=${createHash(
        password
      )} WHERE account_ref=${accountRef}`,
      undefined,
      caller
    );

    response.body = handleSuccess("password reset", {
      isSuccess: true,
      caller,
    });
  } catch (error) {
    response.statusCode = 500;

    response.body = errors[2001]({
      caller: event.caller,
      endpoint: "resetPassword",
      data: {
        error,
      },
    });

    logger.error(response);
  }

  return response;
};

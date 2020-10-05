const { handleSuccess, logger } = require("../../utils/utils");
const { query, getConnection } = require("../../utils/database");
const { scrubAccount } = require("../../utils/accounts");
const { createHash, validateAndParse } = require("../../utils/security");
const errors = require("../../utils/errors");

exports.authoriseUser = async (event) => {
  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    },
  };

  try {
    const { caller, email, password, rememberMe } = await validateAndParse({
      service: "authoriseUser",
      event,
      required: ["caller", "email", "password"],
      isAuth: false,
    });

    const connection = await getConnection(caller);

    const hashedPassword = createHash(password);

    const results = await query(
      `SELECT * FROM accounts WHERE email=${email} AND password=${hashedPassword}`,
      undefined,
      caller,
      connection
    );

    if (!results.length > 0) {
      connection.release();
      response.statusCode = 401;

      response.body = errors[1002]({
        caller,
        endpoint: "authoriseUser",
        data: {
          email,
        },
      });

      return response;
    }

    connection.release();

    const token = createJwToken(
      { accountRef: results[0].account_ref },
      rememberMe === 1 ? "365d" : "1d"
    );

    response.body = handleSuccess("account found", {
      token,
      account: scrubAccount(results[0]),
      caller,
    });
  } catch (error) {
    response.statusCode = 500;

    response.body = errors[2001]({
      caller: event.caller,
      endpoint: "authoriseUser",
      data: {
        error,
      },
    });

    logger.error(response);
  }

  return response;
};

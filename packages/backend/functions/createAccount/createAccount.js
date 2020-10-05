const { handleSuccess, logger } = require("../../utils/utils");
const { query, getConnection } = require("../../utils/database");
const { mapAccountToDb, scrubAccount } = require("../../utils/accounts");
const {
  createHash,
  validateAndParse,
  createJwToken,
} = require("../../utils/security");
const errors = require("../../utils/errors");

exports.createAccount = async (event) => {
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
      email,
      firstName,
      lastName,
      password,
      phone,
    } = await validateAndParse({
      service: "createAccount",
      event,
      required: [
        "caller",
        "email",
        "firstName",
        "lastName",
        "password",
        "phone",
      ],
      isAuth: false,
    });

    const connection = await getConnection(caller);

    const emails = await query(
      `SELECT * FROM accounts WHERE email='${email}'`,
      undefined,
      caller,
      connection
    );

    if (emails.length > 0) {
      connection.release();
      response.statusCode = 500;

      response.body = errors[1000]({
        caller,
        endpoint: "createAccount",
        data: {
          email,
        },
      });

      return response;
    }

    const data = mapAccountToDb({
      email,
      firstName,
      lastName,
      password: createHash(password),
      phone,
    });

    const results = await query(
      `INSERT INTO accounts SET ?`,
      data,
      caller,
      connection
    );

    connection.release();

    response.body = handleSuccess("account created", {
      account: scrubAccount(data),
      token: createJwToken({ accountRef: results.insertId }),
      caller,
    });
  } catch (error) {
    response.statusCode = 500;

    response.body = errors[2001]({
      caller: event.caller,
      endpoint: "createAccount",
      data: {
        error,
      },
    });

    logger.error(response);
  }

  return response;
};

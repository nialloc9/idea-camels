const { handleSuccess, logger } = require("../../utils/utils");
const { query, getConnection } = require("../../utils/database");
const { validateAndParse } = require("../../utils/security");
const { formatToUtc } = require("../../utils/date");
const errors = require("../../utils/errors");

exports.createExperiment = async (event) => {
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
      domainRef,
      templateRef,
      content,
      theme,
      expiry,
      decodedToken: { accountRef },
    } = await validateAndParse({
      service: "createAccount",
      event,
      required: [
        "caller",
        "domainRef",
        "templateRef",
        "content",
        "theme",
        "expiry",
      ],
    });

    const connection = await getConnection(caller);

    const domains = query(
      `SELECT * FROM domains WHERE account_ref=${accountRef} AND domain_ref=${domainRef};`,
      undefined,
      "createExperiment",
      connection
    );

    if (!domains.length > 0) {
      connection.release();
      response.statusCode = 401;

      response.body = errors[1001]({
        caller,
        endpoint: "createExperiment",
        data: {
          error,
          accountRef,
          domainRef,
        },
      });

      return response;
    }

    const data = {
      account_ref: accountRef,
      template_ref: templateRef,
      content: content,
      theme: theme,
      domain_ref: domainRef,
      created_by: accountRef,
      last_updated_at: accountRef,
      expiry: formatToUtc(expiry),
    };

    const results = query(
      `INSERT INTO experiments SET ?`,
      data,
      "createExperiment",
      connection
    );

    connection.release();

    response.body = handleSuccess("experiment created", {
      experiment: { ...data, experiment_ref: results.insertId },
      caller,
    });
  } catch (error) {
    response.statusCode = 500;

    response.body = errors[2001]({
      caller: event.caller,
      endpoint: "createExperiment",
      data: {
        error,
      },
    });

    logger.error(response);
  }

  return response;
};

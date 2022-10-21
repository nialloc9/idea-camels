const { endpoints } = require("./utils/server");
const { validateAndParse } = require("./utils/security");
const { logger } = require("./utils/utils");

const responseHandler = {
  success: (body) => {
    const payload = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        "Access-Control-Allow-Methods": "POST,OPTIONS,GET",
      },
      body: JSON.stringify(body),
    };

    logger.info(payload, "SUCCESS");
    return payload;
  },
  error: ({ message = "Internal Server Error", data }) => {
    logger.error(data, message);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Methods": "POST,OPTIONS,GET",
      },
      body: JSON.stringify({
        statusCode: 500,
        error: message,
        data: JSON.stringify(data),
      }),
    };
  },
};

exports.handler = async (event) => {
  try {
    const { path, body, headers } = event;

    const endpoint = endpoints.find(({ uri }) => uri === path);

    if (!endpoint)
      return responseHandler.error({
        message: "Endpoint Not Found",
        data: { event },
      });

    const {
      uri,
      required = [],
      isAuth = false,
      isAdmin = false,
      func,
    } = endpoint;
    logger.info(endpoint, `${uri} found`);

    const data = await validateAndParse({
      uri,
      req: { headers, body: JSON.parse(body) },
      required,
      isAuth,
      isAdmin,
    });

    const payload = await func({ data, uri, caller: data.caller });

    return responseHandler.success({ payload, uri });
  } catch (error) {
    return responseHandler.error({
      message: error.message,
      data: { error: JSON.stringify(error), event },
    });
  }
};

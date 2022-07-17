import axios from "axios";
import { config as defaultConfig } from "../config";
import { generateRandomId, logger } from "./utils";

/**
 * @description configures error based one environment as localhost uses express server not lambda api
 * @param {*} param0
 * @returns
 */
export const configureErrorResponse = ({
  error: err,
  config = defaultConfig,
}) => {
  try {
    if (config.env === "development") {
      const {
        response: { data: { message, data, statusCode } = {} } = {},
      } = err;

      return {
        message:
          message || err.message || "An error has occured. Please try again.",
        data: data ? data : data,
        code: statusCode,
      };
    }

    const { response: { data: { error, data, statusCode } = {} } = {} } = err;

    return {
      message:
        error || err.message || "An error has occured. Please try again.",
      data: data ? data : {},
      code: statusCode,
    };
  } catch (e) {
    return { message: e.message };
  }
};

/**
 * @description configures response based one environment as localhost uses express server not lambda api
 * @param {*} param0
 * @returns
 */
export const configureSuccessResponse = ({
  response,
  config = defaultConfig,
}) => (config.env === "development" ? response.data : response.data.payload);

/**
 * @description sends http request
 * @param {*} param0
 * @returns
 */
export const post = async ({
  url,
  body,
  headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  token,
}) => {
  const headersToSend = token
    ? { ...headers, Authorization: `Bearer ${token}` }
    : headers;

  const response = await axios.post(
    url,
    { ...body, caller: generateRandomId() },
    { headers: headersToSend }
  );

  logger.log("========== POST API CALL RESPONSE ==========", response);

  return configureSuccessResponse({ response });
};

/**
 * @description sends post request to API
 * @param {*} param0
 * @returns
 */
export const postApi = async ({
  uri,
  body,
  headers,
  token,
  config = defaultConfig,
}) => {
  try {
    const { data } = await post({
      url: `${config.api.base}/${uri}`,
      body,
      headers,
      token,
    });

    return { data };
  } catch (error) {
    logger.log("========== POST API CALL ERROR RESPONSE ==========", {
      error,
      response: error.response,
    });
    return { error: configureErrorResponse({ error }) };
  }
};

/**
 * @description uploads a file to the server
 * @param {*} payload
 * @returns {<Promise>}
 */
export const upload = async ({ file, token }) => {
  const {
    data: { signedUrl, url },
  } = await postApi({
    uri: `upload/get-upload-url`,
    body: {
      type: file.type,
    },
    token,
  });

  await axios.put(signedUrl, file, { headers: { "Content-Type": file.type } });

  return { url };
};

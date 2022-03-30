import axios from "axios";
import { config } from "../config";
import { generateRandomId, logger } from "./utils";

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

  logger.log("========== API CALL ==========", {
    url,
    data: { ...body, caller: generateRandomId() },
    config: { headers: headersToSend },
  });

  const { data } = await axios.post(
    url,
    { ...body, caller: generateRandomId() },
    { headers: headersToSend }
  );

  return data;
};

/**
 * @description sends post request to API
 * @param {*} param0
 * @returns
 */
export const postApi = async ({ uri, body, headers, token }) =>
  await post({
    url: `${config.api.base}/${uri}`,
    body,
    headers,
    token,
  });

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

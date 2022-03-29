import axios from "axios";
import { config } from "../config";
import { generateRandomId } from "./utils";
import { getError } from "./errors";

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
  try {
    const headersToSend = token
      ? { ...headers, Authorization: `Bearer ${token}` }
      : headers;

    const { data } = await axios.post(
      url,
      { ...body, caller: generateRandomId() },
      { headers: headersToSend }
    );

    if (data.code !== 200) {
      throw new Error(getError(data));
    }

    return data;
  } catch (error) {
    throw new Error(getError(error));
  }
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

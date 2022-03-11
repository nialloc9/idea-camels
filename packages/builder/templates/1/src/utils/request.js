import axios from "axios";
import { config } from "../config";
import { generateRandomId } from "./utils";

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
}) => {
  const headersToSend = {
    ...headers,
    Authorization: `Bearer ${config.security.token}`,
  };

  const { data } = await axios.post(
    url,
    { ...body, caller: generateRandomId() },
    { headers: headersToSend }
  );

  if (data.code !== 200) {
    throw new Error(data);
  }

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

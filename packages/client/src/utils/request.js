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
  cache,
  mode,
  originalHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  token,
}) => {
  const headers = token
    ? { ...originalHeaders, Authorization: `Bearer ${token}` }
    : originalHeaders;

  const rawResponse = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ ...body, caller: generateRandomId() }),
    cache,
    mode,
  });

  const content = await rawResponse.json();

  if (rawResponse.status !== 200) {
    throw new Error(getError(content));
  }

  return content;
};

export const postApi = ({ uri, body, headers, token, cache, mode }) =>
  post({
    url: `${config.api.base}/${uri}`,
    body,
    originalHeaders: headers,
    token,
    cache,
    mode,
  });

/**
 * @description uploads a file to the server
 * @param {*} payload
 * @returns {<Promise>}
 */
export const upload = ({ type, folder, file, token, data, caller }) => {
  const body = new FormData();
  body.append("file", file);
  body.append("folder", folder);
  body.append("data", data);
  body.append("caller", caller);

  return postApi({
    uri: `upload/${type}`,
    headers: {},
    cache: "no-cache",
    mode: "cors",
    method: "POST",
    body,
    token,
  });
};

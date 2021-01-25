import { config } from '../config'
import { generateRandomId } from './utils'
import { getError } from './errors'

export const post = async ({
    url,
    body,
    cache,
    mode,
    originalHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    token
}) => {

    const headers = token ? { ...originalHeaders, Authorization: `Bearer ${token}` } : originalHeaders;

    const rawResponse = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({...body, caller: generateRandomId()}),
        cache,
        mode
    });

    const content = await rawResponse.json();
    
    if(rawResponse.status !== 200) {
        throw new Error(getError(content)) 
    }

    return content
};

export const postApi = ({ uri, body, headers, token, cache, mode }) => post({ url: `${config.api.base}/${uri}`, body, originalHeaders: headers, token, cache, mode });

/**
 * @description uploads a file to the server
 * @param {*} payload
 * @returns {<Promise>}
 */
export const upload =  async ({ type, folder, file, token, caller }) => {
    const data = new FormData();
    data.append("image", file);
    data.append("folder", folder);
    data.append("caller", caller);

    return postApi({
        uri: `upload/${type}`,
        headers: {},
        cache: "no-cache",
        mode: "cors",
        method: "POST",
        body: data,
        token
    })
};
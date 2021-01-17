import { config } from '../config'
import { generateRandomId } from './utils'
import { getError } from './errors'

export const post = async ({
    url,
    body,
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
    });

    const content = await rawResponse.json();
    
    if(rawResponse.status !== 200) {
        throw new Error(getError(content)) 
    }

    return content
};

export const postApi = ({ uri, body, headers, token }) => post({ url: `${config.api.base}/${uri}`, body, headers, token });

const { endpoints } = require('./utils/server');
const { validateAndParse } = require('./utils/security');
const { logger } = require('./utils/utils');

exports.handler = async (event) => {
    try { 
        const { path, body, headers } = event;

        const endpoint = endpoints.find(({ uri }) => uri === path)

        const { uri, required = [], isAuth = false, func } = endpoint;

        const data = await validateAndParse({ uri, req: { headers, body: JSON.parse(body) }, required, isAuth })
            
        const payload = await func({ data, uri, caller: data.caller });

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
                "Access-Control-Allow-Methods": "POST"
            },
            'body': JSON.stringify({ payload, uri })
        }
    } catch(error) {
        logger.error("error", error)
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
                "Access-Control-Allow-Methods": "POST"
            },
            'body': error
        }
    }
}
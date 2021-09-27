const { endpoints } = require('./utils/server');
const { validateAndParse } = require('./utils/security');
const { logger } = require('./utils/utils');

exports.handler = async ({ path, body, headers }) => {
    try { 
       
        const endpoint = endpoints.find(({ uri }) => uri === path)
        logger.info("endpoint: ", endpoint)

        const { uri, required = [], isAuth = false, func } = endpoint;

        const data = await validateAndParse({ uri, req, required, isAuth })
            
        const payload = await func({ data, req, uri, caller: data.caller });

        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': JSON.stringify({ payload, uri })
        }
    } catch(error) {
        logger.error("error", error)
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': JSON.stringify(error)
        }
    }
}
const { WebClient } = require('@slack/web-api');
const config = require('./config');

/**
 * @description sends alert
 * https://www.npmjs.com/package/@slack/web-api
 */
const sendAlert = async ({ channel=config.slack.alertChannel, text }, {client = new WebClient(config.slack.token)} = {}) => {
  try {
    const data = await client.chat.postMessage({
      text,
      channel,
    })
    
    return { data }
  } catch (error) {
    return { error }
  }
};



module.exports = {
    sendAlert
}
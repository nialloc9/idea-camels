const { WebClient } = require('@slack/web-api');
const config = require('./config');

/**
 * @description sends alert
 * https://www.npmjs.com/package/@slack/web-api
 */
const sendAlert = async ({ channel, text }, {client = new WebClient(config.slack.token)}) =>  await client.chat.postMessage({
    text,
    channel,
  });

module.exports = {
    sendAlert
}
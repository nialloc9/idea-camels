const { handleSuccess, logger } = require("../utils/utils");
const { sendAlert } = require("../utils/alert");
const config = require("../utils/config");

  const onLogError = ({ data = {} }) =>
  new Promise(async (resolve, reject) => {
    try {
      const {error} = await sendAlert({
        channel: config.slack.clientErrorChannel,
        text: JSON.stringify(data)
      });

      if(error) {
        return reject(error)
      }
      
      resolve(handleSuccess("okay"));
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
    onLogError
};

const { handleSuccess, logger } = require("../utils/utils");
const { sendAlert } = require("../utils/alert");

const onLogError = ({ data = {} }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { error } = await sendAlert({
        channel: "kw-optimiser-client-prod-alerts",
        text: JSON.stringify(data),
      });

      if (error) {
        return reject(error);
      }

      resolve(handleSuccess("okay"));
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  onLogError,
};

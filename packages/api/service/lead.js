const { onCreate } = require("../data/leads");
const { handleSuccess } = require("../utils/utils");

/**
 * @description creates a lead
 * @param {*} param0
 * @returns
 */
const onCreateLead = ({ data: { email, experimentRef }, caller }) =>
  new Promise(async (resolve, reject) => {
    try {
      await onCreate({
        email,
        experimentRef,
        caller,
      });

      return resolve(handleSuccess("okay"));
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  onCreateLead,
};

const { onGet, onCreate } = require("../data/leads");
const errors = require("../utils/errors");
const { handleSuccess } = require("../utils/utils");

/**
 * gets leads from database
 * @param {*} param0
 * @returns
 */
const onGetLead = ({ data: { leadRef, experimentRef }, caller }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await onGet({
        data: { leadRef, experimentRef },
        caller,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

/**
 * @description creates a lead
 * @param {*} param0
 * @returns
 */
const onCreateLead = ({
  data: {
    email,
    decodedToken: {
      data: { experimentRef },
    },
  },
  caller,
}) =>
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
  onGetLead,
  onCreateLead,
};

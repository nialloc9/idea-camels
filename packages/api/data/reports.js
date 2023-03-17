const { query } = require("../utils/database");
const { handleSuccess } = require("../utils/utils");
const { mapper } = require("./utils/lead");
const { now } = require("../utils/date");

/**
 * creates a new report
 */
const onCreate = ({ data, caller }) =>
  new Promise(async (resolve, reject) => {
    try {
      const createQuery = "INSERT INTO report SET ?";

      const mappedData = mapper(data);

      const results = await query(
        createQuery,
        mappedData,
        caller,
        "CREATE_REPORT"
      );
      const timestamp = now();

      resolve(
        handleSuccess(`DATA - CREATE_REPORT - FROM ${caller}`, {
          ...mappedData,
          report_ref: results.insertId,
        })
      );
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  onCreate,
};

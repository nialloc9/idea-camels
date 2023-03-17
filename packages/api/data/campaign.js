const { query } = require("../utils/database");
const { handleSuccess } = require("../utils/utils");
const { mapper } = require("./utils/report");
const { now } = require("../utils/date");

/**
 * @description gets campaigns
 */
const onGet = ({ data: { accountRef }, caller }) =>
  new Promise(async (resolve, reject) => {
    try {
      const getQuery = accountRef
        ? `SELECT * FROM campaigns WHERE account_ref='${accountRef}`
        : "SELECT * FROM campaigns";

      const results = await query(getQuery, undefined, caller, "GET_CAMPAIGN");

      resolve(
        handleSuccess(`DATA - GET_CAMPAING - FROM ${caller}`, {
          campaigns: results,
        })
      );
    } catch (error) {
      reject(error);
    }
  });

/**
 * @description creates a new campaign
 */
const onCreate = ({ data, caller }) =>
  new Promise(async (resolve, reject) => {
    try {
      const createQuery = "INSERT INTO campaigns SET ?";

      const mappedData = mapper(data);

      const results = await query(
        createQuery,
        mappedData,
        caller,
        "CREATE_CAMPAIGN"
      );
      const timestamp = now();

      resolve(
        handleSuccess(`DATA - CREATE_CAMPAIGN - FROM ${caller}`, {
          ...mappedData,
          created_at: timestamp,
          last_updated_at: timestamp,
          experiment_ref: results.insertId,
        })
      );
    } catch (error) {
      reject(error);
    }
  });

/**
 * @description updates campaign
 */
const onUpdate = ({
  data: { accountRef, lastUpdatedBy, data: updateData },
  caller,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const updateQuery = `UPDATE campaigns SET ? WHERE account_ref='${accountRef}'`;

      const data = {
        last_updated_by: lastUpdatedBy,
        last_updated_at: null,
        ...mapper(updateData),
      };

      await query(updateQuery, data, caller, "UPDATE_CAMPAIGN");

      resolve(
        handleSuccess(`DATA - UPDATE_CAMPAIGN - FROM ${caller}`, {
          ...data,
          account_ref: accountRef,
          last_updated_at: now(),
        })
      );
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  onGet,
  onCreate,
  onUpdate,
};

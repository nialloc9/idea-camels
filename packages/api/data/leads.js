const { query } = require("../utils/database");
const { handleSuccess } = require("../utils/utils");
const { mapper } = require("./utils/lead");
const { now } = require("../utils/date");

/**
 * gets a lead
 */
const onGet = ({ data: { experimentRef, leadRef }, caller }) =>
  new Promise(async (resolve, reject) => {
    try {
      const whereClause = experimentRef
        ? `experiment_ref=${experimentRef};`
        : `lead_ref='${leadRef}';`;
      const getQuery = `SELECT * FROM leads WHERE ${whereClause}`;

      const results = await query(getQuery, undefined, caller, "GET_LEAD");

      resolve(handleSuccess(`DATA - GET_LEAD - FROM ${caller}`, results));
    } catch (error) {
      reject(error);
    }
  });

/**
 * gets multple leads
 */
const onGetMultiple = ({ data: { experimentRef, leadRef }, caller }) =>
  new Promise(async (resolve, reject) => {
    try {
      const whereClause = experimentRef ? `experiment_ref` : `lead_ref`;
      const getQuery = `SELECT * FROM leads WHERE ${whereClause} IN (?)`;

      const results = await query(
        getQuery,
        experimentRef || leadRef,
        caller,
        "GET_MULTIPLE_LEADS"
      );

      resolve(
        handleSuccess(`DATA - GET_MULTIPLE_LEADS - FROM ${caller}`, {
          leads: results,
        })
      );
    } catch (error) {
      reject(error);
    }
  });

/**
 * creates a new lead
 */
const onCreate = ({ data, caller }) =>
  new Promise(async (resolve, reject) => {
    try {
      const createQuery = "INSERT INTO leads SET ?";

      const mappedData = mapper(data);

      const results = await query(
        createQuery,
        mappedData,
        caller,
        "CREATE_LEAD"
      );
      const timestamp = now();

      resolve(
        handleSuccess(`DATA - CREATE_LEAD - FROM ${caller}`, {
          ...mappedData,
          created_at: timestamp,
          last_updated_at: timestamp,
          lead_ref: results.insertId,
        })
      );
    } catch (error) {
      reject(error);
    }
  });

/**
 * updates a lead using token identify
 */
const onUpdate = ({
  data: { leadRef, lastUpdatedBy, data: updateData },
  caller,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const updateQuery = `UPDATE leads SET ? WHERE lead_ref='${leadRef}'`;

      const data = {
        last_updated_by: lastUpdatedBy,
        last_updated_at: null,
        ...mapper(updateData),
      };

      await query(updateQuery, data, caller, "UPDATE_LEAD");

      resolve(
        handleSuccess(`DATA - UPDATE_LEAD - FROM ${caller}`, {
          ...data,
          lead_ref: leadRef,
          last_updated_at: now(),
        })
      );
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  onGet,
  onGetMultiple,
  onCreate,
  onUpdate,
};

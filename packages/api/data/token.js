const { query } = require("../utils/database");
const { handleSuccess } = require("../utils/utils");
const { mapper } = require("./utils/token");
const { now } = require("../utils/date");

/**
 * gets a token
 */
const onGet = ({ data: { email, accountRef }, caller }) =>
  new Promise(async (resolve, reject) => {
    try {
      const whereClause = email
        ? `email='${email}';`
        : `account_ref='${accountRef}';`;
      const getQuery = `SELECT * FROM tokens WHERE ${whereClause}`;

      const results = await query(getQuery, undefined, caller, "GET_TOKEN");

      resolve(handleSuccess(`DATA - GET_TOKEN - FROM ${caller}`, results));
    } catch (error) {
      reject(error);
    }
  });

/**
 * creates a new token
 */
const onCreate = ({ data, caller, connection }) =>
  new Promise(async (resolve, reject) => {
    try {
      const createQuery = "INSERT INTO tokens SET ?";

      const mappedData = mapper(data);

      const results = await query(
        createQuery,
        mappedData,
        caller,
        "CREATE_TOKEN",
        connection
      );
      const timestamp = now();

      resolve(
        handleSuccess(`DATA - CREATE_TOKEN - FROM ${caller}`, {
          ...mappedData,
          created_at: timestamp,
          last_updated_at: timestamp,
          account_ref: results.insertId,
        })
      );
    } catch (error) {
      reject(error);
    }
  });

/**
 * updates a token using token identify
 */
const onUpdate = ({
  data: { token, lastUpdatedBy, data: updateData },
  caller,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const updateQuery = `UPDATE tokens SET ? WHERE token='${token}'`;

      const data = {
        last_updated_by: lastUpdatedBy,
        last_updated_at: null,
        ...mapper(updateData),
      };

      await query(updateQuery, data, caller, "UPDATE_TOKEN");

      resolve(
        handleSuccess(`DATA - UPDATE_TOKEN - FROM ${caller}`, {
          ...data,
          token,
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

const { query } = require("../utils/database");
const { handleSuccess } = require("../utils/utils");
const { mapper } = require("./utils/account");
const { scrubAccount } = require("../utils/security");
const { now } = require("../utils/date");

/**
 * gets a account
 */
const onGet = ({ data: { email, accountRef }, caller }) =>
  new Promise(async (resolve, reject) => {
    try {
      const whereClause = email
        ? `email='${email}';`
        : `account_ref='${accountRef}';`;
      const getQuery = `SELECT * FROM accounts WHERE ${whereClause}`;

      const results = await query(getQuery, undefined, caller, "GET_ACCOUNT");

      resolve(
        handleSuccess(
          `DATA - GET_ACCOUNT - FROM ${caller}`,
          results,
          ["password"],
          false
        )
      );
    } catch (error) {
      reject(error);
    }
  });

/**
 * creates a new account
 */
const onCreate = ({ data, caller }) =>
  new Promise(async (resolve, reject) => {
    try {
      const createQuery = "INSERT INTO accounts SET ?";

      const mappedData = mapper(data);

      const results = await query(
        createQuery,
        mappedData,
        caller,
        "CREATE_ACCOUNT"
      );
      const timestamp = now();

      resolve(
        handleSuccess(`DATA - CREATE_ACCOUNT - FROM ${caller}`, {
          ...scrubAccount(mappedData),
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
 * updates an account
 */
const onUpdate = ({
  data: { accountRef, lastUpdatedBy, data: updateData },
  caller,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const updateQuery = `UPDATE accounts SET ? WHERE account_ref='${accountRef}'`;

      const data = {
        last_updated_by: lastUpdatedBy,
        last_updated_at: null,
        ...mapper(updateData),
      };

      await query(updateQuery, data, caller, "UPDATE_ACCOUNT");

      resolve(
        handleSuccess(`DATA - UPDATE_ACCOUNT - FROM ${caller}`, {
          ...scrubAccount(data),
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

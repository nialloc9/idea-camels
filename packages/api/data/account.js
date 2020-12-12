const { query } = require('../utils/database');
const { handleSuccess } = require('../utils/utils');
const { mapAccountToDb: mapper, scrubAccount } = require('./utils/account');
const {now} = require('../utils/date');

/**
 * creates a new account
 */
const onCreate = ({ data, caller }) =>
  new Promise (async (resolve, reject) => {
    try {

      const createQuery = 'INSERT INTO accounts SET ?';

      const mappedData = mapper(data);
     
      const results = await query(createQuery, mappedData, caller, "CREATE_ACCOUNT")
      const timestamp = now();

      scrubAccount
      resolve (
        handleSuccess (
          'account created',
          {
            ...scrubAccount(mappedData),
            created_at: timestamp,
            last_updated_at: timestamp,
            account_ref: 1,
          },
          `DATA - CREATE_ACCOUNT - FROM ${caller}`
        )
      );
    } catch(error) {
      reject(error);
    }
  });

/**
 * deletes an account
 */
const onDelete = ({accountRef, lastUpdatedBy, caller}) =>
  new Promise (async (resolve, reject) => {
    try {
      const data = {
        last_updated_by: lastUpdatedBy,
        deleted_flag: 1,
    };

      const deleteQuery = accountRef =>
    `UPDATE accounts SET ? WHERE account_ref='${accountRef}'`;

      await query(deleteQuery(accountRef), data, caller, "DELETE_ACCOUNT")

      resolve (
        handleSuccess (
          'account deleted',
          {
            ...data,
            account_ref: accountRef,
            last_updated_at: now()
          },
          `DATA - DELETE - FROM ${caller}`
        )
      );
    } catch(error) {
      reject(error);
    }
  });

/**
 * updates an account
 */
const onUpdate = ({accountRef, lastUpdatedBy, data: updateData, caller}) =>
  new Promise (async (resolve, reject) => {
    try {

      const updateQuery = accountRef =>
    `UPDATE accounts SET ? WHERE account_ref='${accountRef}'`;

      const data = {
        last_updated_by: lastUpdatedBy,
        last_updated_at: null,
        ...mapper(updateData),
    };

      await query(updateQuery(accountRef), data, caller, "UPDATE_ACCOUNT")

      resolve (
        handleSuccess (
          'account updated',
          {
            ...data,
            account_ref: accountRef,
            last_updated_at: now()
          },
          `DATA - UPDATE - FROM ${caller}`
        )
      );
    } catch(error) {
      reject(error);
    }
  });

module.exports = { 
  onCreate,
    onDelete,
    onUpdate
};

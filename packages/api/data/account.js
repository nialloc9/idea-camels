const { query } = require('../utils/database');
const { handleSuccess } = require('../utils/utils');
const { mapAccountToDb: mapper } = require('./utils/account');
const { scrubAccount } = require('../utils/security');
const {now} = require('../utils/date');

/**
 * gets a account
 */
const onGet = ({ data: { email }, caller }) =>
  new Promise (async (resolve, reject) => {
    try {

      const getQuery = `SELECT * FROM accounts WHERE email=${email}`;  

      const results = await query(getQuery, undefined, caller, "GET_ACCOUNT")

      resolve (
        handleSuccess (
          'account found',
          results,
          `DATA - GET_ACCOUNT - FROM ${caller}`
        )
      );
    } catch(error) {
      reject(error);
    }
  });

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
            account_ref: results.insertId,
          },
          `DATA - CREATE_ACCOUNT - FROM ${caller}`
        )
      );
    } catch(error) {
      reject(error);
    }
  });

  /**
 * updates an account
 */
const onUpdate = ({ data: {accountRef, lastUpdatedBy, data: updateData}, caller  }) =>
new Promise (async (resolve, reject) => {
  try {

    const updateQuery =
  `UPDATE accounts SET ? WHERE account_ref='${accountRef}'`;

    const data = {
      last_updated_by: lastUpdatedBy,
      last_updated_at: null,
      ...mapper(updateData),
  };

    await query(updateQuery, data, caller, "UPDATE_ACCOUNT")

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
  onGet,
  onCreate,
    onUpdate
};

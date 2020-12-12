const { query } = require('../utils/database');
const { handleSuccess } = require('../utils/utils');
const { mapDomainToDb: mapper } = require('./utils/domain');
const {now} = require('../utils/date');

/**
 * gets domains by domain name
 */
const onGetByName = ({ data: { name }, caller }) =>
  new Promise (async (resolve, reject) => {
    try {

      const getQuery = `SELECT * FROM domains WHERE name=${name}`;  

      const results = await query(getQuery, undefined, caller, "GET_DOMAIN_BY_NAME")

      resolve (
        handleSuccess (
          'domains found',
          results,
          `DATA - GET_DOMAIN_BY_NAME - FROM ${caller}`
        )
      );
    } catch(error) {
      reject(error);
    }
  });

/**
 * gets domains by account ref
 */
const onGetByAccountRef = ({ data: { accountRef }, caller }) =>
  new Promise (async (resolve, reject) => {
    try {

      const getQuery = `SELECT * FROM domains WHERE account_ref=${accountRef}`;  

      const results = await query(getQuery, undefined, caller, "GET_DOMAIN_BY_ACCOUNT_REF")

      resolve (
        handleSuccess (
          'domains found',
          results,
          `DATA - GET_DOMAIN_BY_ACCOUNT_REF - FROM ${caller}`
        )
      );
    } catch(error) {
      reject(error);
    }
  });

/**
 * creates a new domain
 */
const onCreate = ({ data, caller }) =>
  new Promise (async (resolve, reject) => {
    try {

      const createQuery = 'INSERT INTO domains SET ?';

      const mappedData = mapper(data);
     
      const results = await query(createQuery, mappedData, caller, "CREATE_DOMAIN")
      const timestamp = now();

    
      resolve (
        handleSuccess (
          'domain created',
          {
            ...mappedData,
            created_at: timestamp,
            last_updated_at: timestamp,
            domain_ref: results.insertId,
          },
          `DATA - CREATE_DOMAIN - FROM ${caller}`
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
    onGetByName,
    onGetByAccountRef,
  onCreate,
    onUpdate
};

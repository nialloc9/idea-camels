const { query } = require('../utils/database');
const { handleSuccess } = require('../utils/utils');
const { mapper } = require('./utils/domain');
const {now, getYearsFromDate} = require('../utils/date');

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
          `DATA - GET_DOMAIN_BY_NAME - FROM ${caller}`,
          results
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
          `DATA - GET_DOMAIN_BY_ACCOUNT_REF - FROM ${caller}`,
          results
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

      if(!data.createdBy) data.createdBy = data.accountRef

      const mappedData = mapper(data);
     
      // add default of 1 year. Cannot be done in my MYSQL as defaults cannot be functions or variables.
      if(!mappedData.expiry) mappedData.expiry = getYearsFromDate(1);

      const results = await query(createQuery, mappedData, caller, "CREATE_DOMAIN")
      const timestamp = now();

    
      resolve (
        handleSuccess (
          `DATA - CREATE_DOMAIN - FROM ${caller}`,
          {
            ...mappedData,
            created_at: timestamp,
            last_updated_at: timestamp,
            domain_ref: results.insertId,
          }
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
  `UPDATE domains SET ? WHERE account_ref='${accountRef}'`;

    const data = {
      last_updated_by: lastUpdatedBy,
      last_updated_at: null,
      ...mapper(updateData),
  };

    await query(updateQuery, data, caller, "UPDATE_DOMAIN")

    resolve (
      handleSuccess (
        `DATA - UPDATE_DOMAIN - FROM ${caller}`,
        {
          ...data,
          account_ref: accountRef,
          last_updated_at: now()
        }
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
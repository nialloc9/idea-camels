const { query } = require('../utils/database');
const { handleSuccess } = require('../utils/utils');
const { mapper } = require('./utils/experiment');
const {now} = require('../utils/date');

/**
 * gets experiments by account ref
 */
const onGetByAccountRef = ({ data: { accountRef }, caller }) =>
  new Promise (async (resolve, reject) => {
    try {

      const getQuery = `SELECT * FROM experiments WHERE account_ref=${accountRef}`;  

      const results = await query(getQuery, undefined, caller, "GET_EXPERIMENTS_BY_ACCOUNT_REF")

      resolve (
        handleSuccess (
          `DATA - GET_EXPERIMENTS_BY_ACCOUNT_REF - FROM ${caller}`,
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

      const createQuery = 'INSERT INTO experiments SET ?';

      const mappedData = mapper(data);
     
      const results = await query(createQuery, mappedData, caller, "CREATE_EXPERIMENT")
      const timestamp = now();

    
      resolve (
        handleSuccess (
          `DATA - CREATE_EXPERIMENT - FROM ${caller}`,
          {
            ...mappedData,
            created_at: timestamp,
            last_updated_at: timestamp,
            experiment_ref: results.insertId,
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
  `UPDATE experiments SET ? WHERE account_ref='${accountRef}'`;

    const data = {
      last_updated_by: lastUpdatedBy,
      last_updated_at: null,
      ...mapper(updateData),
  };

    await query(updateQuery, data, caller, "UPDATE_EXPERIMENT")

    resolve (
      handleSuccess (
        `DATA - UPDATE_EXPERIMENT - FROM ${caller}`,
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
    onGetByAccountRef,
  onCreate,
    onUpdate
};

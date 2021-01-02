const { query } = require('../utils/database');
const { handleSuccess } = require('../utils/utils');
const { mapper, transform } = require('./utils/theme');
const {now} = require('../utils/date');

/**
 * gets themes by theme ref
 */
const onGetByThemeRef = ({ data: { themeRef }, caller }) =>
  new Promise (async (resolve, reject) => {
    try {

      const getQuery = `SELECT * FROM themes WHERE theme_ref=${themeRef}`;  

      const results = await query(getQuery, undefined, caller, "GET_THEME_BY_THEME_REF")
      
      resolve (
        handleSuccess (
          `DATA - GET_THEME_BY_THEME_REF - FROM ${caller}`,
          results
        )
      );
    } catch(error) {
      reject(error);
    }
  });

/**
 * creates a new theme
 */
const onCreate = ({ data, caller }) =>
  new Promise (async (resolve, reject) => {
    try {

      const createQuery = 'INSERT INTO themes SET ?';

      if(!data.createdBy) data.createdBy = data.accountRef
        
      const transformedData = transform(data);

      const mappedData = mapper(transformedData);
      
      const results = await query(createQuery, mappedData, caller, "CREATE_THEME")
      const timestamp = now();

    
      resolve (
        handleSuccess (
          `DATA - CREATE_THEME - FROM ${caller}`,
          {
            ...mappedData,
            created_at: timestamp,
            last_updated_at: timestamp,
            theme_ref: results.insertId,
          }
        )
      );
    } catch(error) {
      reject(error);
    }
  });

  /**
 * updates a theme
 */
const onUpdate = ({ data: {themeRef, lastUpdatedBy, data: updateData}, caller  }) =>
new Promise (async (resolve, reject) => {
  try {

    const updateQuery =
  `UPDATE themes SET ? WHERE theme_ref='${themeRef}'`;

    const data = {
      last_updated_by: lastUpdatedBy,
      last_updated_at: null,
      ...mapper(updateData),
  };

    await query(updateQuery, data, caller, "UPDATE_THEME")

    resolve (
      handleSuccess (
        `DATA - UPDATE_THEME - FROM ${caller}`,
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
    onGetByThemeRef,
  onCreate,
    onUpdate
};

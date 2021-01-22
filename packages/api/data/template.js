const { query } = require('../utils/database');
const { handleSuccess } = require('../utils/utils');

/**
 * gets themes by theme ref
 */
const onGetByWithTheme = ({ caller }) =>
  new Promise (async (resolve, reject) => {
    try {

      const getQuery = `SELECT t.template_ref, t.theme_ref, th.theme, th.content FROM templates as t INNER JOIN themes as th ON t.theme_ref = th.theme_ref WHERE t.deleted_flag=0;`;  

      const results = await query(getQuery, undefined, caller, "GET_TEMPLATES_WTIH_THEME")
      
      resolve (
        handleSuccess (
          `DATA - GET_TEMPLATES_WTIH_THEME - FROM ${caller}`,
          results
        )
      );
    } catch(error) {
      reject(error);
    }
  });

module.exports = { 
    onGetByWithTheme
};

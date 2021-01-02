const { query } = require('../utils/database');
const { handleSuccess } = require('../utils/utils');

/**
 * gets experiments by experiment ref
 */
const onGetByExperimentRef = ({ data: { experimentRef } }) =>
  new Promise (async (resolve, reject) => {
    try {

      const getQuery = `SELECT themes.theme AS theme, themes.content AS content, domains.name AS name
      FROM experiments
      INNER JOIN domains
      ON experiments.domain_ref = domains.domain_ref
      INNER JOIN themes
      ON experiments.theme_ref = themes.theme_ref WHERE experiments.experiment_ref=${experimentRef};`;  

      const results = await query(getQuery, undefined, "GET_EXPERIMENT_BY_EXPERIMENT_REF")

      resolve (
        handleSuccess (
          `DATA - GET_EXPERIMENT_BY_EXPERIMENT_REF`,
          results
        )
      );
    } catch(error) {
      reject(error);
    }
  });

module.exports = { 
  onGetByExperimentRef
};

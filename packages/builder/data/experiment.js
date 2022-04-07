const { query } = require("../utils/database");
const { handleSuccess, now } = require("../utils/utils");

/**
 * gets experiments by experiment ref
 */
const onGetByExperimentRef = ({ data: { experimentRef } }) =>
  new Promise(async (resolve, reject) => {
    try {
      const getQuery = `SELECT d.name as domain, th.content, th.theme, e.template_ref from experiments as e INNER JOIN themes as th on e.theme_ref = th.theme_ref INNER JOIN domains as d on e.domain_ref = d.domain_ref where e.experiment_ref=${experimentRef} LIMIT 1;`;

      const results = await query(
        getQuery,
        undefined,
        "GET_EXPERIMENT_BY_EXPERIMENT_REF"
      );

      resolve(
        handleSuccess(`DATA - GET_EXPERIMENT_BY_EXPERIMENT_REF`, results)
      );
    } catch (error) {
      reject(error);
    }
  });

/**
 * updates an experiment
 */
const onUpdate = ({ data: { experimentRef, data: updateData }, caller }) =>
  new Promise(async (resolve, reject) => {
    try {
      const updateQuery = `UPDATE experiments SET ? WHERE experiment_ref='${experimentRef}'`;

      const data = {
        last_updated_at: now(),
        ...updateData,
      };

      await query(updateQuery, data, "UPDATE_EXPERIMENT");

      resolve(
        handleSuccess(`DATA - UPDATE_EXPERIMENT - FROM ${caller}`, {
          ...data,
          account_ref: accountRef,
          last_updated_at: now(),
        })
      );
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  onGetByExperimentRef,
  onUpdate,
};

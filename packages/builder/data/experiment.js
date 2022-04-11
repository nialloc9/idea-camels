const { query } = require("../utils/database");
const { handleSuccess, now } = require("../utils/utils");

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
          experiment_ref: experimentRef,
        })
      );
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  onUpdate,
};

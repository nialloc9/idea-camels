const {
  convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase,
} = require("../../utils/utils");

const dbNames = convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase([
  `lead_ref`,
  `experiment_ref`,
  `email`,
  `created_at`,
  `last_updated_at`,
  `deleted_flag`,
]);

const mapper = (account) =>
  Object.keys(account).reduce((total, curr) => {
    if (dbNames[curr]) {
      total[dbNames[curr]] = account[curr];
    }

    return total;
  }, {});

module.exports = { mapper };

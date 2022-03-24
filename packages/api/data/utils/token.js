const {
  convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase,
} = require("../../utils/utils");

const dbNames = convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase([
  `token_ref`,
  `token`,
  `email`,
  `type`,
  `expires`,
  `created_by`,
  `created_at`,
  `last_updated_at`,
  `last_updated_by`,
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

const {
  convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase,
} = require("../../utils/utils");

const dbNames = convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase([
  `domain_ref`,
  `name`,
  `account_ref`,
  `expiry`,
  `created_by`,
  `created_at`,
  `last_updated_at`,
  `last_updated_by`,
  `deleted_flag`,
]);

const mapper = (domain) =>
  Object.keys(domain).reduce((total, curr) => {
    if (dbNames[curr]) {
      total[dbNames[curr]] = domain[curr];
    }

    return total;
  }, {});

module.exports = { mapper };

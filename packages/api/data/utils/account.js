const {
  convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase,
} = require("../../utils/utils");

const dbNames = convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase([
  `account_ref`,
  `payment_customer_id`,
  `email`,
  `first_name`,
  `last_name`,
  `password`,
  `phone`,
  `created_at`,
  `last_updated_at`,
  `last_logged_in`,
  `deleted_flag`,
  `remember_me`,
]);

const mapper = (account) =>
  Object.keys(account).reduce((total, curr) => {
    if (dbNames[curr]) {
      total[dbNames[curr]] = account[curr];
    }

    return total;
  }, {});

module.exports = { mapper };

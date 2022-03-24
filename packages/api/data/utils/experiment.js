const {
  convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase,
} = require("../../utils/utils");

const dbNames = convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase([
  `experiment_ref`,
  `account_ref`,
  `domain_ref`,
  `theme_ref`,
  `template_ref`,
  `end_date`,
  `budget`,
  `created_by`,
  `created_at`,
  `last_updated_at`,
  `last_updated_by`,
  `deleted_flag`,
]);

const mapper = (experiment) =>
  Object.keys(experiment).reduce((total, curr) => {
    if (dbNames[curr]) {
      total[dbNames[curr]] = experiment[curr];
    }

    return total;
  }, {});

module.exports = { mapper };

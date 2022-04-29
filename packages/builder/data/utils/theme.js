const {
  convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase,
} = require("../../utils/utils");

const dbNames = convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase([
  `theme_ref`,
  `content`,
  `theme`,
  `created_by`,
  `created_at`,
  `last_updated_at`,
  `last_updated_by`,
  `deleted_flag`,
]);

const mapper = (theme) =>
  Object.keys(theme).reduce((total, curr) => {
    if (dbNames[curr]) {
      total[dbNames[curr]] = theme[curr];
    }

    return total;
  }, {});

module.exports = { mapper };

const {
  convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase,
} = require("../../../utils/utils");

const dbNames = convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase([
  "campaign_ref",
  "account_ref",
  "experiment_ref",
  "campaign_name",
  "client_id",
  "client_secret",
  "refresh_token",
  "developer_token",
  "customer_id",
  "created_by",
  "created_at",
  "last_updated_at",
  "last_updated_by",
  "deleted_flag",
]);

const mapper = (domain) =>
  Object.keys(domain).reduce((total, curr) => {
    if (dbNames[curr]) {
      total[dbNames[curr]] = domain[curr];
    }

    return total;
  }, {});

module.exports = { mapper };

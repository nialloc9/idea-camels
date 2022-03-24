const {
  convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase,
} = require("../../utils/utils");

const dbNames = convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase([
  "campaign_ref",
  "account_ref",
  "experiment_ref",
  "campaign_name",
  "budget_name",
  "ad_group_name",
  "ad_group_ad_name",
  "criterion_0_name",
  "criterion_1_name",
  "criterion_2_name",
  "criterion_3_name",
  "criterion_4_name",
  "criterion_5_name",
  "keyword_0",
  "keyword_1",
  "keyword_2",
  "keyword_3",
  "keyword_4",
  "keyword_5",
  "keyword_6",
  "headline",
  "headline_2",
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

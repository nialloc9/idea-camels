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
  "criterion_6_name",
  "criterion_7_name",
  "criterion_8_name",
  "criterion_9_name",
  "criterion_10_name",
  "criterion_11_name",
  "criterion_12_name",
  "criterion_13_name",
  "criterion_14_name",
  "criterion_15_name",
  "criterion_16_name",
  "criterion_17_name",
  "criterion_18_name",
  "criterion_19_name",
  "keyword_0",
  "keyword_1",
  "keyword_2",
  "keyword_3",
  "keyword_4",
  "keyword_5",
  "keyword_6",
  "keyword_7",
  "keyword_8",
  "keyword_9",
  "keyword_10",
  "keyword_11",
  "keyword_12",
  "keyword_13",
  "keyword_14",
  "keyword_15",
  "keyword_16",
  "keyword_17",
  "keyword_18",
  "keyword_19",
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

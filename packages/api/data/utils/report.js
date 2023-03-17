const {
  convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase,
} = require("../../utils/utils");

const dbNames = convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase([
  `report_ref`,
  `experiment_ref`,
  `google_ads_campaign_id`,
  `impressions`,
  `clicks`,
  `average_cpm`,
  `average_cpc`,
  `cost_micros`,
  `engagements`,
]);

const mapper = (domain) =>
  Object.keys(domain).reduce((total, curr) => {
    if (dbNames[curr]) {
      total[dbNames[curr]] = domain[curr];
    }

    return total;
  }, {});

module.exports = { mapper };

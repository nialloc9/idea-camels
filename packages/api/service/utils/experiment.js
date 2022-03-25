const config = require("../../utils/config");
const { getDateInYYMMDD } = require("../../utils/utils");
const { calculateAdBudgetMinusMarkup } = require("../../utils/payments");

/**
 * @description maps criterions to database object and a response object for user that matches API
 * @param {*} criterions
 * @returns
 */
const mapCriterionsToDb = ({ criterions, keywords }) =>
  criterions.reduce((total = {}, { resource_name: criterionName }, index) => {
    total[`criterion${index}Name`] = criterionName;
    total[`keyword${index}`] = keywords[index];

    return total;
  }, {});

/**
 * @description maps keywords to criterions to create for google api
 * @param {*} param0
 * @returns
 */
const mapKeywordsToCriterionToCreate = ({ keywords, adGroupName }) =>
  keywords.reduce((total = [], curr) => {
    if (curr) {
      total.push({
        ad_group: adGroupName,
        final_mobile_urls: [],
        final_urls: [],
        keyword: { match_type: 4, text: curr }, // Broad range match of keyword
        negative: false, // target the keyword. True is exlude keyword
        status: 2, // ENABLED
      });
    }

    return total;
  }, []);

/**
 * @description maps experiments to adGroupNames
 * @param {*} experiments
 * @returns
 */
const mapExperimentsToAdGroupNames = (experiments) =>
  experiments.map(({ ad_group_name }) => ad_group_name);

/**
 * @description maps experiment to config required for building on ECS
 * @param {*} param0
 * @returns
 */
const mapBuildExperimentToECSConfig = ({ experimentRef, templateRef }) => ({
  cluster: config.aws.clusters.builder.name,
  taskDefinition: config.aws.clusters.builder.taskDefinition,
  environmentVariables: [
    {
      name: "EXPERIMENT_REF",
      value: experimentRef.toString(),
    },
    { name: "TEMPLATE_REF", value: templateRef.toString() },
  ],
});

/**
 * @description maps experiment to campaign budget
 * @param {*} param0
 * @returns
 */
const mapExperimentToCampaignBudget = ({
  budget,
  accountRef,
  domainRef,
  experimentRef,
  name,
}) => ({
  amount_micros: calculateAdBudgetMinusMarkup({ budget }) * 1000000,
  explicitly_shared: false, // only for this campaign
  name: `${accountRef}-${domainRef}-${experimentRef}-${name}-budget`,
  period: 2, // DAILY - period to spend budget
  status: 2, // ENABLED
  type: 2, // STANDARD - caps daily spend at twice the specified budget amount
});

/**
 * @description maps experiment to campaign
 * @param {*} param0
 * @returns
 */
const mapExperimentToCampaign = ({
  accountRef,
  experimentRef,
  budgetName,
  domainRef,
  endDate,
  name,
}) => ({
  advertising_channel_type: 2, // search
  bidding_strategy_type: 9, // target spend. i.e get as many clicks as possible in budget
  campaign_budget: budgetName,
  end_date: getDateInYYMMDD(endDate),
  name: `${accountRef}-${domainRef}-${experimentRef}-${name}-campaign`,
  payment_mode: 4, // CLICKs i.e pay perclick
  start_date: getDateInYYMMDD(),
  status: 2, // ENABLED
});

/**
 * @description maps experiment to ad group
 * @param {*} param0
 * @returns
 */
const mapExperimentToAdGroup = ({
  campaignName,
  budget,
  experimentRef,
  accountRef,
  domainRef,
  name,
}) => ({
  ad_rotation_mode: 2, // OPTIMIZE - Optimize ad group ads base don clicks or concersions
  campaign: campaignName,
  cpc_bid_micros: (budget / 5) * 1000000,
  cpm_bid_micros: (budget / 5) * 1000000,
  explorer_auto_optimizer_setting: { opt_in: false },
  name: `${accountRef}-${domainRef}-${experimentRef}-${name}-adgroup`,
  status: 2, // ENABLED
  targeting_setting: {},
  type: 2, // SEARCH CAMPAIGNS
  url_custom_parameters: [],
});

/**
 * @description maps experiment to ad group ad
 * @param {*} param0
 * @returns
 */
const mapExperimentToAdGroupAd = ({
  name,
  adGroupName,
  description,
  headline,
  headline2,
}) => ({
  ad: {
    added_by_google_ads: false,
    device_preference: 0,
    expanded_text_ad: {
      description,
      headline_part1: headline,
      headline_part2: headline2,
    },
    final_app_urls: [],
    final_mobile_urls: [],
    final_urls: [`https://${name}`],
    url_collections: [],
    url_custom_parameters: [],
  },
  ad_group: adGroupName,
  status: 2, // ENABLED
});

/**
 * @description maps metrics to experiments
 */
const mapMetricsToExperiment = ({ metrics, experiments }) => {
  const mappedMetricsToAdGroupName = metrics.reduce(
    (total = {}, { ad_group, metrics }) => {
      total[ad_group.resource_name] = metrics;
      return total;
    },
    {}
  );

  return experiments.map((o) => ({
    ...o,
    metrics: mappedMetricsToAdGroupName[o.ad_group_name],
  }));
};

/**
 * @description maps leads to experiments
 */
const mapExperimentsToLeads = ({ leads = [], experiments = [] }) => {
  const newLeads = Array.isArray(leads) ? leads : [];

  const leadsMappedToExperimentRef = newLeads.reduce((total = {}, curr) => {
    if (total[curr.experiment_ref]) {
      total[curr.experiment_ref].push(curr);
    } else {
      total[curr.experiment_ref] = [curr];
    }

    return total;
  }, {});

  return experiments.map((o) => ({
    ...o,
    leads: leadsMappedToExperimentRef[o.experiment_ref] || [],
  }));
};

module.exports = {
  mapCriterionsToDb,
  mapKeywordsToCriterionToCreate,
  mapExperimentsToAdGroupNames,
  mapBuildExperimentToECSConfig,
  mapExperimentToCampaignBudget,
  mapExperimentToCampaign,
  mapExperimentToAdGroup,
  mapExperimentToAdGroupAd,
  mapMetricsToExperiment,
  mapExperimentsToLeads,
};

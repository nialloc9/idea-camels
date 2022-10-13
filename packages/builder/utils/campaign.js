const config = require("./config");
const { getDateInYYMMDD } = require("./utils");

/**
 * @description Calculates ad budget to run ads after taking away markup on ads
 * @param {*} param0
 * @returns
 */
const calculateAdBudgetMinusMarkup = ({ budget }) =>
  (parseInt(budget) / 100) * (100 - config.payments.advertPercentageMarkup);

/**
 * @description maps criterions to database object and a response object for user that matches API
 * @param {*} criterions
 * @returns
 */
const mapCriterionsToDb = ({ criterions = [], keywords }) =>
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
 * @description maps experiment to campaign budget
 * @param {*} param0
 * @returns
 */
const mapExperimentToCampaignBudget = ({ budget, experimentRef, name }) => ({
  amount_micros: calculateAdBudgetMinusMarkup({ budget }) * 1000000,
  explicitly_shared: false, // only for this campaign
  name: `${experimentRef}-${name}-budget`,
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
  experimentRef,
  budgetName,
  endDate,
  name,
}) => ({
  advertising_channel_type: 2, // search
  bidding_strategy_type: 9, // target spend. i.e get as many clicks as possible in budget
  campaign_budget: budgetName,
  end_date: getDateInYYMMDD(endDate),
  name: `${experimentRef}-${name}-campaign`,
  payment_mode: 4, // CLICKs i.e pay perclick
  start_date: getDateInYYMMDD(),
  status: 2, // ENABLED
});
// Need to add below to txt record on route53 ideacamels.com txt
("v=spf1 include:amazonses.com ~all");
/**
 * @description maps experiment to ad group
 * @param {*} param0
 * @returns
 */
const mapExperimentToAdGroup = ({
  campaignName,
  budget,
  experimentRef,
  name,
}) => ({
  ad_rotation_mode: 2, // OPTIMIZE - Optimize ad group ads base don clicks or concersions
  campaign: campaignName,
  cpc_bid_micros: (budget / 5) * 1000000,
  cpm_bid_micros: (budget / 5) * 1000000,
  explorer_auto_optimizer_setting: { opt_in: false },
  name: `${experimentRef}-${name}-adgroup`,
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
    responsive_search_ad: {
      description,
      headlines: [headline, headline2],
      path1: `https://${name}`,
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

module.exports = {
  mapCriterionsToDb,
  mapKeywordsToCriterionToCreate,
  mapExperimentToCampaignBudget,
  mapExperimentToCampaign,
  mapExperimentToAdGroup,
  mapExperimentToAdGroupAd,
};

const config = require("../config");

const campaignBudget = {
  amount_micros: 12000000,
  delivery_method: 2,
  explicitly_shared: false,
  has_recommended_budget: false,
  id: 1624493702,
  name: "My campaign budget",
  period: 2,
  reference_count: 0,
  resource_name: `customers/${config.googleAds.customerIdSplit}/campaignBudgets/1624493702`,
  status: 3,
  type: 2,
};

const campaign = {
  ad_serving_optimization_status: 2,
  advertising_channel_sub_type: 0,
  advertising_channel_type: 3,
  base_campaign:
    "customers/${config.googleAds.customerIdSplit}/campaigns/1568629385",
  bidding_strategy_type: 9,
  campaign_budget: `customers/${config.googleAds.customerIdSplit}/campaignBudgets/1624493702`,
  end_date: "2037-12-30",
  experiment_type: 2,
  frequency_caps: [],
  geo_target_type_setting: {
    negative_geo_target_type: 4,
    positive_geo_target_type: 5,
  },
  id: 1568629385,
  labels: [],
  name: "My campaign",
  network_settings: {
    target_content_network: true,
    target_google_search: false,
    target_partner_search_network: false,
    target_search_network: false,
  },
  payment_mode: 4,
  resource_name: `customers/${config.googleAds.customerIdSplit}/campaigns/1568629385`,
  serving_status: 2,
  start_date: "2018-09-19",
  status: 4,
  target_spend: { cpc_bid_ceiling_micros: 1000000 },
  url_custom_parameters: [],
  video_brand_safety_suitability: 0,
};

const adGroup = {
  ad_rotation_mode: 0,
  base_ad_group: `customers/${config.googleAds.customerIdSplit}/adGroups/56761341338`,
  campaign: `customers/${config.googleAds.customerIdSplit}/campaigns/1568629385`,
  cpc_bid_micros: 6000000,
  cpm_bid_micros: 10000,
  cpv_bid_micros: 0,
  display_custom_bid_dimension: 0,
  effective_target_cpa_micros: 0,
  effective_target_cpa_source: 0,
  effective_target_roas: 4,
  effective_target_roas_source: 5,
  explorer_auto_optimizer_setting: { opt_in: false },
  id: 56761341338,
  labels: [],
  name: "My ad group",
  resource_name: `customers/${config.googleAds.customerIdSplit}/adGroups/56761341338`,
  status: 3,
  target_cpa_micros: 0,
  targeting_setting: {
    target_restrictions: [
      { targeting_dimension: 3, bid_only: false },
      { targeting_dimension: 4, bid_only: false },
      { targeting_dimension: 5, bid_only: false },
      { targeting_dimension: 6, bid_only: false },
      { targeting_dimension: 7, bid_only: false },
      { targeting_dimension: 8, bid_only: false },
      { targeting_dimension: 9, bid_only: false },
    ],
  },
  type: 13,
  url_custom_parameters: [],
};

const adGroupAd = {
  ad: {
    added_by_google_ads: false,
    device_preference: 0,
    expanded_text_ad: {
      description: "my description here2",
      headline_part1: "headline part 1 here2",
      headline_part2: "headline part 2 here2",
      path1: "path one here2",
      path2: "path two here2",
    },
    final_app_urls: [],
    final_mobile_urls: [],
    final_urls: ["http://hello.com"],
    id: 284706472002,
    resource_name: `customers/${config.googleAds.customerIdSplit}/ads/284706472002`,
    system_managed_resource_source: 0,
    type: 3,
    url_collections: [],
    url_custom_parameters: [],
  },
  ad_group: `customers/${config.googleAds.customerIdSplit}/adGroups/56761341338`,
  ad_strength: 0,
  policy_summary: {
    approval_status: 0,
    policy_topic_entries: [],
    review_status: 2,
  },
  resource_name: `customers/${config.googleAds.customerIdSplit}/adGroupAds/56761341338~284706472002`,
  status: 2,
};

module.exports = {
  campaignBudget,
  campaign,
  adGroup,
  adGroupAd,
};

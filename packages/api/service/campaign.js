const { onGet: onGetDomain } = require("../data/domain");
const { handleSuccess, generateRandomId } = require("../utils/utils");
const errors = require("../utils/errors");
const {
  createBudget,
  createCampaign,
  createAdGroup,
  createAdGroupAd,
  enums,
  createAdPayload,
  toMicros,
} = require("../utils/googleAds");

const onCreateCampaign = ({
  data: {
    decodedToken: { accountRef },
    domainRef,
    amount,
    deliveryMethod = enums.BudgetDeliveryMethod.STANDARD,
    maxCostPerClick,
    maxCostPer1000Impressions,
    adDescription,
    adHeadlinePart1,
    adHeadlinePart2,
  },
  caller,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const { data: domains } = await onGetDomain({
        data: { accountRef, domainRef },
        caller,
      });

      const { name: domainName } = domains[0];

      const name = `${generateRandomId()}-${domainName}`;

      const amountMicros = toMicros(amount);

      const budgetName = await createBudget({
        name,
        amountMicros,
        deliveryMethod,
      });

      const campaignName = await createCampaign({
        name,
        campaignBudget: budgetName,
        status: enums.CampaignStatus.ENABLED,
        advertisingChannelType: enums.AdvertisingChannelType.SEARCH,
      });

      const maxMicrosCostPerClick = toMicros(maxCostPerClick);
      const maxMicrosPer1000Impressions = toMicros(maxCostPer1000Impressions);

      const adGroupName = await createAdGroup({
        name,
        campaign: campaignName,
        maxCostPerClick: maxMicrosCostPerClick,
        maxCostPer1000Impressions: maxMicrosPer1000Impressions,
        status: enums.AdGroupStatus.PAUSED,
        type: enums.AdvertisingChannelType.SEARCH,
      });

      const ad = createAdPayload({
        adDescription,
        adHeadlinePart1,
        adHeadlinePart2,
        domain: domainName,
      });

      const adGroupAdName = await createAdGroupAd({
        adGroup: adGroupName,
        status: enums.AdGroupAdStatus.ENABLED,
        ad,
      });

      const responseData = {
        budget: {
          name: budgetName,
          deliveryMethod,
          amountMicros,
        },
        campaign: {
          name: budgetName,
          status: enums.CampaignStatus.ENABLED,
        },
        adGroup: {
          name: adGroupName,
          maxCostPerClick,
          maxCostPer1000Impressions,
          status: enums.AdGroupStatus.ENABLED,
          type: enums.AdGroupType.SEARCH_STANDARD,
        },
        adGroupAd: {
          name: adGroupAdName,
          status: enums.AdGroupAdStatus.ENABLED,
          ad,
        },
      };

      resolve(handleSuccess("campaign created", responseData));
    } catch (error) {
      reject(
        errors["1007"]({
          service: "CREATE_CAMPAIGN",
          caller,
          reason: error.message,
          data: {
            domainRef,
            amount,
            deliveryMethod: enums.BudgetDeliveryMethod.STANDARD,
            maxCostPerClick,
            maxCostPer1000Impressions,
            adDescription,
            adHeadlinePart1,
          },
        })
      );
    }
  });

module.exports = {
  onCreateCampaign,
};

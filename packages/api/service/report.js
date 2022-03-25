const { onGet: onGetCampaigns } = require("../data/campaign");
const { handleSuccess } = require("../utils/utils");
const { getMetrics } = require("../utils/googleAds");
const { mapExperimentsToAdGroupNames } = require("./utils/experiment");

/**
 * @description creates a lead
 * @param {*} param0
 * @returns
 */
const onGetAdPerformance = ({ caller }) =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        data: { campaigns },
      } = await onGetCampaigns({
        caller,
        data: {},
      });

      const metrics = await getMetrics({
        metrics: [
          "clicks",
          "impressions",
          "average_cpm",
          "average_cpc",
          "cost_micros",
          "engagements",
          "gmail_forwards",
        ],
        orderBy: "clicks",
        adGroupResourceName: mapExperimentsToAdGroupNames(campaigns), // e.g ["customers/9074082905/adGroups/108117690178"]
      });

      return resolve(handleSuccess("okay", { metrics }));
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  onGetAdPerformance,
};

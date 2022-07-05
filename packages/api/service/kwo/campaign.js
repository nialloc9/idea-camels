const { onCreate } = require("../../data/kwo/campaign");
const { handleSuccess } = require("../../utils/utils");

/**
 * @description creates a lead
 * @param {*} param0
 * @returns
 */
const onCreateCampaign = ({
  data: {
    clientId,
    clientSecret,
    developerToken,
    refreshToken,
    campaignName,
    decodedToken: {
      data: { experimentRef },
    },
  },
  caller,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      await onCreate({
        clientId,
        clientSecret,
        developerToken,
        refreshToken,
        campaignName,
        experimentRef,
        caller,
      });

      return resolve(handleSuccess(""));
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  onCreateCampaign,
};

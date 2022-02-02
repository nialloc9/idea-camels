const { generateRandomId } = require("../utils/utils");
const { getS3SignedUrl } = require("../utils/aws");
const config = require("../utils/config");

const {
  aws: {
    buckets: { userImageBucket },
  },
} = config;

const folderMap = {
  "image/png": "image",
  "image/pneg": "image",
  "image/jpg": "image",
  "image/jpeg": "image",
};

const extensionMap = {
  "image/png": "png",
  "image/pneg": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
};

/**
 * gets a presigned url to upload to
 * @param {*} req
 * @param {*} res
 */
const getSignedUrl = async ({
  data: {
    type,
    decodedToken: { accountRef },
  },
  caller,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await getS3SignedUrl({
        bucket: userImageBucket,
        name: `${accountRef}/${folderMap[type]}/${generateRandomId()}.${
          extensionMap[type]
        }`,
        type,
        caller,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  getSignedUrl,
};

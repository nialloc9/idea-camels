const { generateRandomId } = require("../utils/utils");
const { uploadToS3 } = require("../utils/aws");
const config = require("../utils/config");

const {
  aws: {
    buckets: { userImageBucket },
  },
} = config;

/**
 * uploads an image to public
 * @param {*} req
 * @param {*} res
 */
const uploadImage = async ({ file, decodedToken: { accountRef }, caller }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await uploadToS3({
        bucket: userImageBucket,
        file,
        path: generateRandomId(),
        caller,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  uploadImage,
};

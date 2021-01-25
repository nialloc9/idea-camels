const { generateRandomId } = require('../utils/utils')
const { uploadFile } = require('../utils/upload');
const config = require('../utils/config')

const {
    aws: {
        buckets: { userImageBucket }
    }
} = config;

/**
 * uploads an image to public
 * @param {*} req
 * @param {*} res
 */
const uploadImage = async ({ file, decodedToken: { accountRef }, caller }) => new Promise(async (resolve, reject) => {
    try {
        const response = await uploadFile({
            bucketName: userImageBucket,
            folder: `${accountRef}/images`,
            file,
            type: "image",
            name: generateRandomId(),
            caller
        });

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

module.exports = {
    uploadImage
}
const { ping } = require('../utils/database');
const { handleSuccess } = require('../utils/utils')

const onHealthCheck = () => new Promise(async (resolve) => resolve(handleSuccess("okay")));

const onDBHealthCheck = () => new Promise(async (resolve, reject) => {
    try {
        await ping()
        resolve(handleSuccess("okay"))
    } catch (error) {
        reject(error)
    }
});

module.exports = {
    onHealthCheck,
    onDBHealthCheck
}
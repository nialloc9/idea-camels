const { onGetByAccountRef } = require('../data/domain')

const onGetAccountDomains = ({data: { decodedToken: { accountRef } }, caller}) => new Promise(async (resolve, reject) => {
    try {
        const response = await onGetByAccountRef({ data: { accountRef }, caller });
        
        resolve(response)
    } catch (error) {
        resolve(reject)
    }
});

module.exports = {
    onGetAccountDomains
}
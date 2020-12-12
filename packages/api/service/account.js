const { onCreate: onCreateAccount } = require('../data/account')
const { handleSuccess } = require('../utils/utils')

const onCreate = ({data, caller}) => new Promise(async (resolve, reject) => {
    try {
        const { data: account } = await onCreateAccount({ data, caller });
      
        resolve(handleSuccess('account created', { account }))
    } catch (error) {
        resolve(reject)
    }
});

module.exports = {
    onCreate
}
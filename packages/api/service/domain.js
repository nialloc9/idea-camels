const { onGetByAccountRef, onCreate: onCreateDomain } = require('../data/domain')
const { validateDomain, registerDomain } = require('../utils/aws')
const { logger } = require('../utils/utils')
const errors = require('../utils/errors')
const config = require('../utils/config')

const onGetAccountDomains = ({data: { decodedToken: { accountRef } }, caller}) => new Promise(async (resolve, reject) => {
    try {
        const response = await onGetByAccountRef({ data: { accountRef }, caller });
        
        // TODO run cron to update database to expired for domains going to expire tomorrow
        // TODO run cron to send email for domains going to expire in 1 month and in 1 week
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

const onPurchaseDomain = ({data: { domain, durationInYears = 1, autoRenew = false, decodedToken: { accountRef } }, caller}) => new Promise(async (resolve, reject) => {
    try {
        const { error } = await validateDomain({ domain });

        if(error) {
            return reject(errors["1005"]({ service: 'onPurchaseDomain', caller, reason: error.stack }))
        }

        const { error: registerError } = await registerDomain({ domain, durationInYears, autoRenew });

        if(registerError) {
            const code = registerError.message === 'Given domain is unavailable' ? '1005' : '1006';
            return reject(errors[code]({ service: 'onPurchaseDomain', caller, reason: registerError.stack }))
        }

        const response = await onCreateDomain({ data: { accountRef, domain }, caller });
        
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

module.exports = {
    onGetAccountDomains,
    onPurchaseDomain
}
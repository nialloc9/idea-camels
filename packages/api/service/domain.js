const { onGet: onGetDomain, onCreate: onCreateDomain } = require('../data/domain')
const { validateDomain, registerDomain, suggestDomain, listDomainPrices } = require('../utils/aws')
const errors = require('../utils/errors')
const { handleSuccess } = require('../utils/utils')
const { getDomainPriceWithMarkUp } = require('../utils/price')

const onGetAccountDomains = ({data: { decodedToken: { accountRef } }, caller}) => new Promise(async (resolve, reject) => {
    try {
        const response = await onGetDomain({ data: { accountRef }, caller });
        
        // TODO run cron to update database to expired for domains going to expire tomorrow
        // TODO run cron to send email for domains going to expire in 1 month and in 1 week
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

const onCheckIsDomainAvailable = ({data: { domain }, caller}) => new Promise(async (resolve, reject) => {

    const response = { message: '', domain, caller, suggested: [], isAvailable: false }

    try {
        const { data: { isAvailable } } = await validateDomain({ domain, caller });

        response.isAvailable = isAvailable;

        if(isAvailable) {
            return resolve(handleSuccess("available", response))
        }

        const { data: suggested = [] } = await suggestDomain({ domain, caller });
        
        response.suggested = suggested.map(({ DomainName }) => DomainName);

        return resolve(handleSuccess("unavailable", response))

    } catch (error) {
        reject(error)  
    }
});

/**
 * @description lists domain prices to be bought from registrar
 * @param {*} param0 
 * @returns 
 */
const onListDomainPrices = ({caller}) => new Promise(async (resolve, reject) => {
    try {
        const { data } = await listDomainPrices({ caller });
        
        // adds markup and formats list by removing invalid data
        const filterdList = data.reduce((total, { Name, RegistrationPrice }) => {
            if(!RegistrationPrice) return total

            const { Price, Currency } = RegistrationPrice

            const pricePlusMarkUp = getDomainPriceWithMarkUp(Price)

            total.push({ name: Name, price: pricePlusMarkUp, currency: Currency })

            return total
        }, [])

        return resolve(handleSuccess("Domain prices found", { prices: filterdList, caller }))

    } catch (error) {
        reject(error)  
    }
});

const onPurchaseDomain = ({data: { domain, durationInYears = 1, autoRenew = false, decodedToken: { accountRef } }, caller}) => new Promise(async (resolve, reject) => {

    try {
        const { data: { isAvailable } } = await validateDomain({ domain, caller });

        if(!isAvailable) {
            const { data: suggested = [] } = await suggestDomain({ domain, caller });

            return reject(errors["1005"]({ service: 'onPurchaseDomain', caller, reason: error.stack, data: { suggested } }))
        }

        const { error: registerError } = await registerDomain({ domain, durationInYears, autoRenew });

        if(registerError) {
            const code = registerError.message === 'Given domain is unavailable' ? '1005' : '1006';
            
            return reject(errors[code]({ service: 'onPurchaseDomain', caller, reason: registerError.stack, data: { suggested: [] } }))
        }

        const response = await onCreateDomain({ data: { accountRef, domain }, caller });
        
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

module.exports = {
    onGetAccountDomains,
    onCheckIsDomainAvailable,
    onListDomainPrices,
    onPurchaseDomain
}
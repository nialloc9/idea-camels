const { onGetByAccountRef, onCreate } = require('../data/experiment')

const onGetAccountExperiments = ({data: { decodedToken: { accountRef } }, caller}) => new Promise(async (resolve, reject) => {
    try {
        const response = await onGetByAccountRef({ data: { accountRef }, caller });
        
        // TODO run cron to update database to expired for domains going to expire tomorrow
        // TODO run cron to send email for domains going to expire in 1 month and in 1 week
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

const onCreateExperiment = ({data: { decodedToken: { accountRef }, domainRef, templateRef, content, theme, expiry, name }, caller}) => new Promise(async (resolve, reject) => {
    try {
        const response = await onCreate({ data: { accountRef, domainRef, templateRef, content, theme, expiry, name }, caller });
        
        // TODO add ability to add budget
        // TODO add other system that creates ads after website has been created
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

module.exports = {
    onGetAccountExperiments,
    onCreateExperiment
}


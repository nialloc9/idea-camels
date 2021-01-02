const { onGetByAccountRef, onCreate } = require('../data/experiment')
const { onGetByAccountRef: onGetDomainByAccountRef } = require('../data/domain')
const { onCreate: onCreateTheme } = require('../data/theme')
const { uppercaseSentenceWords } = require('../utils/utils')

const dbNames = {
    themeRef: "theme_ref",
    name: "name",
    content: "content",
    theme: 'theme',
    lastUpdatedAt: 'last_updated_at',
    lastUpdatedBy: 'last_updated_by',
    createdBy: 'created_by',
    deletedFlag: 'deleted_flag'
  };

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

const onCreateExperiment = ({data: { decodedToken: { accountRef }, domainRef, content, theme, expiry, name }, caller}) => new Promise(async (resolve, reject) => {
    try {

        const themeData = {
            name: uppercaseSentenceWords(`${name} theme`),
            content,
            theme,
            lastUpdatedBy: accountRef,
            createdBy: accountRef
        }

        const { data: { theme_ref: themeRef } } = await onCreateTheme({ data: themeData, caller })
        
        const experiment = {
            themeRef,
            accountRef,
            domainRef,
            expiry,
            name
        }

        const response = await onCreate({ data: experiment, caller });
        
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


const { onGetByAccountRef, onCreate } = require('../data/experiment')
const { onCreate: onCreateTheme } = require('../data/theme')
const { uppercaseSentenceWords } = require('../utils/utils')
const { runTask } = require('../utils/aws')
const config = require('../utils/config')

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

const onCreateExperiment = ({data: { decodedToken: { accountRef }, domainRef, content, theme, expiry, name, templateRef }, caller}) => new Promise(async (resolve, reject) => {
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
            templateRef,
            expiry,
            name
        }

        const response = await onCreate({ data: experiment, caller });
        
        // TODO add ability to add budget

        await runTask({ cluster: config.aws.cluster.builder.name, taskDefinition: config.aws.cluster.builder.taskDefinition, environmentVariables: [
            { name: "EXPERIMENT_REF", value: response.data.experiment_ref },
            { name: "TEMPLATE_REF", value: templateRef }
        ]})
    
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

module.exports = {
    onGetAccountExperiments,
    onCreateExperiment
}


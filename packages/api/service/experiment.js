const { onGetWithThemeByAccountRef, onCreate } = require('../data/experiment')
const { onCreate: onCreateTheme } = require('../data/theme')
const { uppercaseSentenceWords, generateRandomId } = require('../utils/utils')
const { listCampaigns, getMetrics } = require('../utils/googleAds')
const { runTask, uploadToS3 } = require('../utils/aws')
const { writeToTmpFile } = require('../utils/file')
const config = require('../utils/config')

const onGetAccountExperiments = ({data: { decodedToken: { data: { accountRef } } }, caller}) => new Promise(async (resolve, reject) => {
    try {
        const metrics = await getMetrics({ metrics: ['clicks', 'impressions'], orderBy: 'clicks', adGroupResourceName: 'customers/9074082905/adGroups/108117690178' });
      
        const response = await onGetWithThemeByAccountRef({ data: { accountRef }, caller });
        
        const campaigns = await listCampaigns();
       
        // TODO run cron to update database to expired for domains going to expire tomorrow
        // TODO run cron to send email for domains going to expire in 1 month and in 1 week
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

/**
 * @description Creates an experiment by uploading theme/content files to s3 and storing config in db before starting ecs task to create website
 * @param {*} param0 
 * @returns 
 */
const onCreateExperiment = ({data: { decodedToken: { accountRef }, domainRef, content, theme, expiry, name, templateRef }, caller}) => new Promise(async (resolve, reject) => {
    try {

        const { path: contentPath, cleanup: onContentCleanUp } = await writeToTmpFile({data: content});
        const { path: themePath, cleanup: onThemeCleanUp } = await writeToTmpFile({data: theme});

        const filename = `${generateRandomId()}.js`;

        const { key: themeKey } = await uploadToS3({ path: themePath, key: `themes/${filename}`, bucket: config.builder.themes.bucketName, caller });

        const { key: contentKey } = await uploadToS3({ path: contentPath, key: `contents/${filename}`, bucket: config.builder.themes.bucketName, caller });
        
        // remove tmp files
        onContentCleanUp();
        onThemeCleanUp();

        const themeData = {
            name: uppercaseSentenceWords(`${name} theme`),
            content: contentKey,
            theme: themeKey,
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

        // await runTask({ cluster: config.aws.clusters.builder.name, taskDefinition: config.aws.clusters.builder.taskDefinition, environmentVariables: [
        //     { name: "EXPERIMENT_REF", value: response.data.experiment_ref },
        //     { name: "TEMPLATE_REF", value: templateRef }
        // ]})
    
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

module.exports = {
    onGetAccountExperiments,
    onCreateExperiment
}


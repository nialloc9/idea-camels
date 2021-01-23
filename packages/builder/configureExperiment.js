const { onGetByExperimentRef } = require('./data/experiment')
const { writeBackendVars, writeTfVars, writeTheme, writeContent } = require('./utils/file')
const config = require('./utils/config')

const main = () => new Promise(async (resolve, reject) => {
    try {
        const { experiment: { experimentRef } } = config;
        
        const { data } = await onGetByExperimentRef({ data: { experimentRef }});
        
        const { name, theme, content, template_ref: templateRef = 1 } = data[0];
        
        writeBackendVars({ experimentRef, domain: name })
        writeTfVars({ experimentRef, domain: name })
        writeTheme({ theme, experimentRef, templateRef })
        writeContent({ content, experimentRef, templateRef })
        
        // TODO run cron to update database to expired for domains going to expire tomorrow
        // TODO run cron to send email for domains going to expire in 1 month and in 1 week
        resolve({ experimentRef })
    } catch (error) {
        reject(error)
    }
});

main()
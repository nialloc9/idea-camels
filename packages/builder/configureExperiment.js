const { onGetByExperimentRef } = require('./data/experiment')
const { writeBackendVars, writeTfVars, writeTheme, writeContent } = require('./utils/file')
const config = require('./utils/config')
const {logger} = require('./utils/utils')

const main = async () => {
    try {
        const { experiment: { experimentRef } } = config;
        
        const { data } = await onGetByExperimentRef({ data: { experimentRef }});
        const { domain, theme, content } = data[0];
        
        writeBackendVars({ experimentRef, domain })
        writeTfVars({ experimentRef, domain })
        writeTheme({ theme, experimentRef })
        writeContent({ content, experimentRef })
       
        // TODO run cron to update database to expired for domains going to expire tomorrow
        // TODO run cron to send email for domains going to expire in 1 month and in 1 week
        
        logger.info("========= EXPERIMENT CREATED =========")
        process.exit(0)
    } catch (error) {
        logger.error(error)
        process.exit(1)
    }
};

main()
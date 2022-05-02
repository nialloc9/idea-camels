const { writeBackendVars, writeTfVars, writeConfig } = require("./utils/file");
const config = require("./utils/config");
const { logger } = require("./utils/utils");

const main = async () => {
  try {
    const {
      experiment: { experimentRef, domain },
    } = config;
    logger.info(
      { experimentRef, domain },
      "========= CONFIGURING EXPERIMENT FOR DELETION  ========="
    );
    writeBackendVars({ experimentRef, domain });
    writeTfVars({ experimentRef, domain });
  
    // TODO: run cron to update database to expired for domains going to expire tomorrow
    // TODO: run cron to send email for domains going to expire in 1 month and in 1 week
  
    logger.info(
      { experimentRef, domain },
      "=========  EXPERIMENT CONFIGURED FOR DELETION  ========="
    );
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

try {
  main().then(process.exit);
} catch (error) {
  logger.error(error);
  process.exit(1);
}

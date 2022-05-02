const { writeBackendVars, writeTfVars, writeConfig } = require("./utils/file");
const config = require("./utils/config");
const { logger } = require("./utils/utils");

const main = async () => {
  try {
    logger.info(
      config,
      "========= CONFIGURING EXPERIMENT  ========="
    );
    writeBackendVars({ config });
    writeTfVars({ config });
    await writeConfig({ config });
  
    // TODO: run cron to update database to expired for domains going to expire tomorrow
    // TODO: run cron to send email for domains going to expire in 1 month and in 1 week
  
    logger.info(
      {},
      "=========  EXPERIMENT CONFIGURED  ========="
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

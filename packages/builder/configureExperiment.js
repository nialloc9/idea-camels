const { writeBackendVars, writeTfVars, writeConfig } = require("./utils/file");
const config = require("./utils/config");
const { logger } = require("./utils/utils");

const main = async () => {
  const {
    experiment: { experimentRef, accountRef, domain, themeKey, contentKey },
  } = config;
  logger.info(
    { experimentRef, domain, themeKey, contentKey },
    "========= CONFIGURING EXPERIMENT  ========="
  );
  writeBackendVars({ experimentRef, domain });
  writeTfVars({ experimentRef, domain });
  await writeConfig({ themeKey, contentKey, experimentRef, accountRef });

  // TODO: run cron to update database to expired for domains going to expire tomorrow
  // TODO: run cron to send email for domains going to expire in 1 month and in 1 week

  logger.info(
    { experimentRef, domain, themeKey, contentKey },
    "=========  EXPERIMENT CONFIGURED  ========="
  );
};

try {
  main().then(process.exit);
} catch (error) {
  logger.error(error);
  process.exit(1);
}

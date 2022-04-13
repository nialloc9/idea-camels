const { onUpdate } = require("./data/experiment");
const { logger } = require("./utils/utils");
const config = require("./utils/config");

const main = async () => {
  const {
    experiment: { experimentRef },
  } = config;

  const {
    env: { STATUS },
  } = process;

  logger.info(
    {
      experimentRef,
      status: STATUS,
    },
    `=========  EXPERIMENT STATUS UPDATING  =========`
  );

  await onUpdate({
    data: { experimentRef, data: { status: STATUS } },
  }).catch((e) => {
    throw e;
  });

  // TODO: run cron to update database to expired for domains going to expire tomorrow
  // TODO: run cron to send email for domains going to expire in 1 month and in 1 week

  logger.info(
    {
      experimentRef,
      status: STATUS,
    },
    `=========  EXPERIMENT STATUS UPDATED  =========`
  );
};

try {
  if (config.shouldLogStatusInDB) {
    main().then(process.exit);
  } else {
    logger.info({}, "logging status disabled");
  }
} catch (error) {
  logger.error(error);
  process.exit(1);
}

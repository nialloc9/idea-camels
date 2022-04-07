const { onUpdate } = require("./data/experiment");
const { logger } = require("./utils/utils");
const config = require("./utils/config");

try {
  const {
    experiment: { experimentRef },
  } = config;

  await onUpdate({
    data: { experimentRef, updateData: { status: process.env.STATUS } },
  });

  // TODO: run cron to update database to expired for domains going to expire tomorrow
  // TODO: run cron to send email for domains going to expire in 1 month and in 1 week

  logger.info(
    `=========  EXPERIMENT ${experimentRef} STATUS UPDATED TO ${process.env.STATUS}  =========`
  );
  process.exit(0);
} catch (error) {
  logger.error(error);
  process.exit(1);
}

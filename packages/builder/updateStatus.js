const { onUpdate } = require("./data/experiment");
const { logger } = require("./utils/utils");
const config = require("./utils/config");

const main = async () => {
  const {
    experiment: { experimentRef },
  } = config;

  logger.info(
    `=========  EXPERIMENT ${experimentRef} STATUS UPDATING TO ${process.env.STATUS}  =========`
  );

  await onUpdate({
    data: { experimentRef, updateData: { status: process.env.STATUS } },
  }).catch((e) => {
    throw e;
  });

  // TODO: run cron to update database to expired for domains going to expire tomorrow
  // TODO: run cron to send email for domains going to expire in 1 month and in 1 week

  logger.info(
    `=========  EXPERIMENT ${experimentRef} STATUS UPDATED TO ${process.env.STATUS}  =========`
  );
};

try {
  main();
} catch (e) {
  console.log(error);
  process.exit(1);
}

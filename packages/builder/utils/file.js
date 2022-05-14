const fs = require("fs");
const { logger, concatArrayToString } = require("./utils");
const { createJwToken } = require("./security");

const AWS = require("aws-sdk");

const downloadFileFromStorage = async (bucket, key, pathToDownloadTo) =>
  new Promise(async (resolve, reject) => {
    const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
    const params = { Bucket: bucket, Key: key };
    logger.info(params, `Downloading ${key} from ${bucket}`);

    const readStream = s3.getObject(params).createReadStream();

    readStream.on("error", reject);

    const writeStream = fs.createWriteStream(pathToDownloadTo);
    writeStream.on("error", reject);

    const res = readStream.pipe(writeStream);

    res.on("error", reject);
    res.on("close", () => {
      logger.info(params, `File ${key} downloaded from ${bucket}`);
      resolve();
    });
  });

const writeToFile = (path, str) => fs.writeFileSync(path, str);

const writeBackendVars = ({ config: { experiment: { experimentRef, domain } } }) => {
  logger.info({ experimentRef, domain }, "Writing backend");
  const path = `./experiments/${experimentRef}/infrastructure/environment/backend.tfvars`;
  const str = `
bucket         = "idea-camels-infrastructure-state"
key            = "prod/${domain}/${experimentRef}/terraform.tfstate"
session_name   = "terraform"
region         = "eu-west-1"
    `;

  writeToFile(path, str);
};

const writeTfVars = ({ config: { experiment: { experimentRef, domain } } }) => {
  logger.info({ experimentRef }, "Writing TF vars");
  const path = `./experiments/${experimentRef}/infrastructure/environment/variables.tfvars`;
  const str = `
fqdn="${domain}"
domain="${domain}"
    `;
  writeToFile(path, str);
  logger.info({ experimentRef }, "Finished writing TF vars");
};

const writeConfig = async ({ 
  config: { 
    experiment: {
      themeKey,
      contentKey,
      experimentRef,
      domain,
      headline,
      description,
      keywords
    }, 
    aws: {
      buckets: {
        themesAndContents: bucket
      }
    },
    api: {
      baseUrl
    }
}
}) => {

  logger.info(
    { experimentRef, bucket, themeKey, contentKey },
    "Writing config"
  );

  const prefix = `./experiments/${experimentRef}/client/config`;

  await downloadFileFromStorage(bucket, contentKey, `${prefix}/content.json`);

  await downloadFileFromStorage(bucket, themeKey, `${prefix}/theme.json`);

  const path = `${prefix}/config.js`;

  const str = `
export default {
  env: "prod",
  isProd: true,
  api: {
    base: "${baseUrl}",
    token: "${createJwToken({ experimentRef })}"
  },
  experiment: {
    experimentRref: "${experimentRef}",
    domain: "${domain}",
    themeKey: "${themeKey}",
    contentKey: "${contentKey}",
    description: "${description}",
    headline: "${headline}",
    keywords: [${concatArrayToString({ arr: keywords })}]
  }
};   
    `;

  writeToFile(path, str);
  logger.info({ experimentRef }, "Finished writing config");
};
module.exports = {
  downloadFileFromStorage,
  writeBackendVars,
  writeTfVars,
  writeConfig,
};

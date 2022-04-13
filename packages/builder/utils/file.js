const fs = require("fs");
const { logger } = require("./utils");
const { createJwToken } = require("./security");
const config = require("./config");

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

const writeBackendVars = ({ experimentRef, domain }) => {
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

const writeTfVars = ({ domain, experimentRef }) => {
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
  bucket = config.aws.buckets.themesAndContents,
  themeKey,
  contentKey,
  experimentRef,
  accountRef,
}) => {
  logger.info({ experimentRef, bucket }, "Writing config");

  const prefix = `./experiments/${experimentRef}/client/src/config`;

  await downloadFileFromStorage(bucket, contentKey, `${prefix}/content.js`);

  await downloadFileFromStorage(
    bucket,
    `${accountRef}/themes/${themeKey}`,
    `${prefix}/theme.js`
  );

  const path = `${prefix}/config.js`;

  const str = `

export default {
    env: "prod",
    experimentRef: ${experimentRef},
    isProd: true,
    social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
    },
    ga: {
        uaId: "UA-173719058-1",
    },
    themeKey: "${themeKey}",
    contentKey: "${contentKey}",
    security: {
      token: "${createJwToken({ experimentRef })}"
    },
    api: {
      base: "https://v1xwkm07ta.execute-api.eu-west-1.amazonaws.com/prod",
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

const fs = require('fs');
const { logger } = require('./utils')
const config = require('./config')

const AWS = require('aws-sdk');


const downloadFileFromStorage = (bucket, key, pathToDownloadTo) => new Promise((resolve, reject) => {
    const s3 = new AWS.S3({apiVersion: '2006-03-01'});
    const params = {bucket, key};
    const file = fs.createWriteStream(pathToDownloadTo);
    const pipe = s3.getObject(params).createReadStream().pipe(file);
    pipe.on('error', reject);
    pipe.on('close', resolve);
  });

const writeToFile = (path, str) => fs.writeFileSync(path, str); 

const writeBackendVars = ({ experimentRef, domain }) => {
    logger.info({ experimentRef, domain }, "Writing backend")
    const path  = `./experiments/${experimentRef}/infrastructure/environment/backend.tfvars`
    const str = `
bucket         = "idea-camels-infrastructure-state"
key            = "prod/${domain}/${experimentRef}/terraform.tfstate"
session_name   = "terraform"
region         = "eu-west-1"
    `

    writeToFile(path, str);
}

const writeTfVars = ({ domain, experimentRef }) => {
    logger.info({ experimentRef }, "Writing TF vars")
    const path = `./experiments/${experimentRef}/infrastructure/environment/variables.tfvars`
    const str = `
fqdn="${domain}"
domain="${domain}"
    `
    writeToFile(path, str);
    logger.info({ experimentRef }, "Finished writing TF vars")
}

const writeConfig = async ({ bucket = config.aws.buckets.themesAndContents, themeKey, contentKey, experimentRef  }) => {
    logger.info({ experimentRef }, "Writing config")

    await downloadFileFromStorage(bucket, contentKey, `./experiments/${experimentRef}/client/src/config/content.js`)
    await downloadFileFromStorage(bucket, themeKey, `./experiments/${experimentRef}/client/src/config/theme.js`)

    const path = `./experiments/${experimentRef}/client//src/config/config.js`

    const str = `
import content from "./content";
import theme from "./theme";

export default {
    env: "prod",
    experimentRef: ${experimentRef},
    isProd: true,
    pathname,
    social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
    },
    ga: {
        uaId: "UA-173719058-1",
    },
    themeKey: ${themeKey},
    contentKey: ${contentKey},
    theme,
    content
};    
    `

    writeToFile(path, str);
    logger.info({ experimentRef }, "Finished writing content")
}
module.exports = {
    downloadFileFromStorage,
    writeBackendVars,
    writeTfVars,
    writeConfig
}




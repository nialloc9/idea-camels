const fs = require('fs');
const { logger } = require('./utils')

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

const writeTheme = ({ theme, experimentRef }) => {
    logger.info({ experimentRef }, "Writing theme")
    const path = `./experiments/${experimentRef}/client/src/config/theme.js`
    const str = `
module.exports = ${theme}
    `
    writeToFile(path, str);
    logger.info({ experimentRef }, "Finished writing theme")
}

const writeContent = ({ content, experimentRef }) => {
    logger.info({ experimentRef }, "Writing content")
    const path = `./experiments/${experimentRef}/client//src/config/content.js`
    const str = `
module.exports = ${content}
    `
    writeToFile(path, str);
    logger.info({ experimentRef }, "Finished writing content")
}

module.exports = {
    writeBackendVars,
    writeTfVars,
    writeTheme,
    writeContent
}




const fs = require('fs');
const { logger } = require('./utils')

const writeToFile = (path, str) => fs.writeFileSync(path, str); 

const writeBackendVars = ({ experimentRef, domain }) => {
    logger.info({ experimentRef, domain }, "Writing backend")
    const path  = `./experiments/${experimentRef}/infrastructure/environment/backend.tfvars`
    const str = `
dynamodb_table = "idea-camels-infrastructure-state"
bucket         = "idea-camels-infrastructure-state"
key            = "prod/${domain}/${experimentRef}/terraform.tfstate"
session_name   = "terraform"
region         = "eu-west-1"
    `

    writeToFile(path, str);
}

const writeTfVars = ({ domain, experimentRef }) => {
    logger.info({ experimentRef }, "Writing TF vars")
    const path = `./infrastructure/environment/variables.tfvars`
    const str = `
fqdn=${domain}
domain=${domain}
    `
    writeToFile(path, str);
    logger.info({ experimentRef }, "Finished writing TF vars")
}

const writeTheme = ({ theme, templateRef }) => {
    logger.info({ templateRef }, "Writing theme")
    const path = `./templates/${templateRef}/src/config/theme.js`
    const str = `
module.exports = ${theme}
    `
    writeToFile(path, str);
    logger.info({ templateRef }, "Finished writing theme")
}

const writeContent = ({ content, templateRef }) => {
    logger.info({ templateRef }, "Writing content")
    const path = `./templates/${templateRef}/src/config/content.js`
    const str = `
module.exports = ${content}
    `
    writeToFile(path, str);
    logger.info({ templateRef }, "Finished writing content")
}

const copyClient = ({ experimentRef, templateRef }) => {
    logger.info({ experimentRef, templateRef }, "Copying client")
    copyDir(`./templates/${templateRef}`, `./experiments/${experimentRef}/client`)
    logger.info({ experimentRef, templateRef }, "Finished copying client")
}

module.exports = {
    writeBackendVars,
    writeTfVars,
    writeTheme,
    copyClient,
    writeContent
}




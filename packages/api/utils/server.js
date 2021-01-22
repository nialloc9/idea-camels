const config = require('./config')
const { onCreate: onCreateAccount, onLogin, onDelete, onUpdate, onForgottonPassword, onReauthorise } = require("../service/account")
const { onGetAccountDomains, onPurchaseDomain } = require("../service/domain")
const { onGetAccountExperiments, onCreateExperiment } = require("../service/experiment")
const { onGet: onGetTemplates } = require("../service/template")
const { logger } = require("./utils")

/**
 * @description sends a response and logs the response
 * @param {*} res
 * @param {*} payload
 * @param {int} code default 200
 * @returns {func}
 */
const sendResponse = (res, { payload, code = 200, uri, message }) => {
    logger.info({ payload, code, uri }, "SUCCESS OUTGOING RPC");
    return res.status(code).send(payload);
};

/**
 * @description formats and sends a response error
 * @param {*} res
 * @param {*} error
 * @return {func}
 */
const sendError = (res, { error = {}, uri, status = 500 }) => {
    logger.error({ err: error, uri, status }, "ERROR OUTGOING RPC");
    
    if(config.isProd && newError.reason) delete error.reason
    
    return res.status(status).send(error);
};

const endpoints = [
    {
      uri: "/account/create",
      func: onCreateAccount,
      required: [ "email", "firstName", "password", "phone", "caller" ]
    },
    {
      uri: "/account/login",
      func: onLogin,
      required: [ "email", "password", "caller" ]
    },
    {
      uri: "/account/update",
      func: onUpdate,
      required: [ "updateData", "caller" ],
      isAuth: true
    },
    {
      uri: "/account/delete",
      required: [ "caller" ],
      func: onDelete,
      isAuth: true
    },
    {
      uri: "/account/forgotton-password",
      required: [ "caller", "email" ],
      func: onForgottonPassword
    },
    {
      uri: "/account/reauthorise",
      required: [ "caller" ],
      func: onReauthorise,
      isAuth: true
    },
    {
      uri: "/domain/get-by-account",
      required: [ "caller" ],
      func: onGetAccountDomains,
      isAuth: true
    },
    {
      uri: "/domain/purchase",
      func: onPurchaseDomain,
      required: [ "domain", "caller" ],
      isAuth: true
    },
    {
      uri: "/experiment/get-by-account",
      required: [ "caller" ],
      func: onGetAccountExperiments,
      isAuth: true
    },
    {
      uri: "/experiment/create",
      func: onCreateExperiment,
      required: [ "domainRef", "content", "theme", "expiry", "name", "templateRef", "caller" ],
      isAuth: true
    },
    {
      uri: "/template/get-with-theme",
      required: [ "caller" ],
      func: onGetTemplates,
      isAuth: true
    },
  ]

module.exports = {
    sendResponse,
    sendError,
    endpoints
}
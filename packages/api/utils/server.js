const config = require('./config')
const { onCreate: onCreateAccount, onLogin, onDelete, onUpdate } = require("../service/account")
const { onGetAccountDomains } = require("../service/domain")
const { logger } = require("./utils")

/**
 * @description sends a response and logs the response
 * @param {*} res
 * @param {*} payload
 * @param {int} code default 200
 * @returns {func}
 */
const sendResponse = (res, payload, code = 200) => {
    const level = code !== 200 ? "error" : "info";
    logger.info(level, "OUTGOING RPC", res.req.originalUrl, payload);
    return res.status(code).send(payload);
};

/**
 * @description formats and sends a response error
 * @param {*} res
 * @param {*} error
 * @return {func}
 */
const sendError = (res, error) => {
    if(config.isProd) delete error.reason;
    return sendResponse(res, error);
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
      func: onDelete,
      isAuth: true
    },
    {
      uri: "/domain/get-by-account",
      func: onGetAccountDomains,
      isAuth: true
    },
  ]

module.exports = {
    sendResponse,
    sendError,
    endpoints
}
const config = require('./config')
const { onCreate: onCreateAccount } = require("../service/account")
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
      uri: "/create-account",
      func: onCreateAccount,
      required: [ "email", "firstName", "password", "phone", "caller" ],
      isAuth: false
    },
  ]

module.exports = {
    sendResponse,
    sendError,
    endpoints
}
const bunyan = require("bunyan");
const config = require("./config");

const defaultLogger = bunyan.createLogger({ name: config.name, serializers: {
  err: bunyan.stdSerializers.err
} });

const logger = {
  info: (data, message) => defaultLogger.info(data, message),
  warn: (data, message) => defaultLogger.warn(data, message),
  error: (data, message = "ERROR") => defaultLogger.error(data, message),
};

/**
 * returns a result object
 * @param {string} successMessage
 * @param {*} data
 * @param {string} title
 * @param {string} level
 * @returns {{result: {successMessage: string, data: *}}}
 * @private
 */
const handleSuccess = (message, data = {}, scrub = []) => {

  const newData = {...data};

  scrub.forEach(o => {
    delete newData[o]
  })

  const response = {
    code: 200,
    message,
    data: newData
  };

  logger.info(response, "SUCCESS");

  return response;
};

module.exports = {
  handleSuccess,
  logger
};
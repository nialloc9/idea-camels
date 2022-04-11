const bunyan = require("bunyan");
const config = require("./config");

const defaultLogger = bunyan.createLogger({
  name: config.name,
  serializers: {
    err: bunyan.stdSerializers.err,
  },
});

const logger = {
  info: (data, message) => defaultLogger.info(data, message),
  warn: (data, message) => defaultLogger.warn(data, message),
  error: (data, message = "ERROR") => defaultLogger.info(data, message),
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
  const newData = { ...data };

  scrub.forEach((o) => {
    delete newData[o];
  });

  const response = {
    code: 200,
    message,
    data: newData,
  };

  logger.info(response, "SUCCESS");

  return response;
};
/** returns a random id */
const generateRandomId = () => Math.random().toString(36).substr(2, 10);

/**
 * creates a new timestamp in the format passed
 * @param {string} timestamp
 */
const createTimestamp = (timestamp) =>
  timestamp ? new Date(timestamp) : new Date();

/**
 * @description creates ISO timestamp for now
 * @returns
 */
const now = () => new Date().toISOString();

module.exports = {
  handleSuccess,
  logger,
  generateRandomId,
  createTimestamp,
  now,
};

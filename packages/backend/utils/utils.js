const bunyan = require("bunyan");
const config = require("./config");

const defaultLogger = bunyan.createLogger({ name: config.name });

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
const handleSuccess = (message, data) => {
  const response = {
    code: 200,
    message,
    data,
  };

  logger.info(response, "SUCCESS");

  return response;
};

/**
 * generates a random number between 100000 and 900000
 * @param min
 * @param max
 */
const generateRandomNumber = (min = 100000, max = 900000) =>
  Math.floor(Math.random() * max) + min;

/** returns a random id */
const generateRandomId = () => Math.random().toString(36).substr(2, 10);

/**
 * creates a new timestamp in the format passed
 * @param {string} timestamp
 */
const createTimestamp = (timestamp) =>
  timestamp ? new Date(timestamp) : new Date();

/**
 * gets the date string from millseconds
 * @param {int} milli
 * @returns {string} iso string
 */
const changeMilliSecondsToDateString = (milli) =>
  new Date(milli * 1000).toISOString();

/**
 * checks if a date preceds another
 * @param {string} before
 * @param {string} date
 * @returns {bool}
 */
const checkDateIsBefore = (before, date) =>
  getDateInSeconds(before) < getDateInSeconds(date);

/**
 * replaces part of a string with another
 * @param {string} target
 * @param {string} subString
 * @param {string} newString
 */
const replaceSubString = (target, subString, newString = "") =>
  target.replace(subString, newString);

/**
 * gets the time in seconds
 * @param {string} date
 * @returns {int}
 */
const getDateInSeconds = (date) => new Date(date).getTime();

/**
 * parses body
 * @param {} body
 */
const parseBody = (event = {}) => {
  const body = event.body || {};

  return JSON.parse(body);
};

module.exports = {
  logger,
  handleSuccess,
  generateRandomNumber,
  generateRandomId,
  createTimestamp,
  changeMilliSecondsToDateString,
  checkDateIsBefore,
  replaceSubString,
  getDateInSeconds,
  parseBody,
};

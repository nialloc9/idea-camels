module.exports.logger = (log = console) => ({
  info: log.info,
  error: log.error,
});

/**
 * returns a result object
 * @param {string} successMessage
 * @param {*} data
 * @param {string} title
 * @param {string} level
 * @returns {{result: {successMessage: string, data: *}}}
 * @private
 */
module.exports.handleSuccess = (message, data) => ({
  code: 200,
  message,
  data,
});

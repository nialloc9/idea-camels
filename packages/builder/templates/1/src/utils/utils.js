/**
 * @description calls the callback if enter key has been pressed
 * @param {*} value
 * @param {func} callback
 * @returns {void}
 */
export const withEnterKey = (value, callback) => (e) => {
  if (e.key === "Enter" && e.shiftKey === false && value && value !== "") {
    e.preventDefault();
    callback(value);
  }
};

/**
 * @description logger used for logging information
 */
export const logger = {
  log: (message, context = {}) => console.log(`${message} : `, context),
  info: (message, context = {}) => console.info(`${message} : `, context),
  error: (message, context = {}) => console.error(`${message} : `, context),
};

/** returns a random id */
export const generateRandomId = () => Math.random().toString(36).substr(2, 10);

/**
 * @description concatinates array
 */
export const concatArrayToString = ({ arr, seperator = ", " }) =>
  arr.reduce((total, curr, index) => {
    if (curr && index === 0) {
      total = total.concat(`"${curr}"`);
    }

    if (curr && index > 0) {
      total = total.concat(`${seperator}"${curr}"`);
    }

    return total;
  }, "");
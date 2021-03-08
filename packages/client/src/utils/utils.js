import _merge from 'lodash.merge';

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
 * Uppercases the first letter of each word
 * @param {string} string 
 */
export const toTitleCase = string => string
.toLowerCase()
.split(' ')
.map(word => word.charAt(0).toUpperCase() + word.slice(1))
.join(' ');

/**
 * @description deep merges 2 objects. obj2 will override obj1
 * @param {*} obj1 
 * @param {*} obj2 
 */
export const deepMerge = (obj1, obj2) => _merge(obj1, obj2);

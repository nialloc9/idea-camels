/**
 * @description calls the callback if enter key has been pressed
 * @param {*} value
 * @param {func} callback
 * @returns {void}
 */
export const withEnterKey = (value, callback) => e => {
    if (e.key === "Enter" && e.shiftKey === false && value && value !== "") {
        e.preventDefault();
        callback(value);
    }
};
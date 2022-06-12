/**
 * @description adds a new value to an array. Used for updating headers and lists in content.
 * @param {*} array
 * @param {*} value
 * @param {*} index
 * @returns
 */
export const addValueToArray = (array, value, index) => {
  const items = [...array];

  items[index] = value;

  return items;
};

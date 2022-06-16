export const setCache = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));
export const getCache = (key) => JSON.parse(localStorage.getItem(key));
export const removeCache = (key) => localStorage.removeItem(key);
export const clearCache = () => localStorage.clear;

import _merge from "lodash.merge";
import Compress from "compress.js";

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
export const toTitleCase = (string) =>
  string
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

/**
 * @description deep merges 2 objects. obj2 will override obj1
 * @param {*} obj1
 * @param {*} obj2
 */
export const deepMerge = (obj1, obj2) => _merge(obj1, obj2);

/**
 * @description resizes images
 * @param {*} param0
 * @returns
 */
export const handleResizeFile = async ({
  file,
  size = 5,
  quality = 1,
  maxWidth = 1920,
  maxHeight = 1920,
  resize = true,
}) => {
  const compress = new Compress();
  const resizedImage = await compress.compress([file], {
    size, // the max size in MB, defaults to 2MB
    quality, // the quality of the image, max is 1,
    maxWidth, // the max width of the output image, defaults to 1920px
    maxHeight, // the max height of the output image, defaults to 1920px
    resize, // defaults to true, set false if you do not want to resize the image width and height
  });
  const img = resizedImage[0];
  const base64str = img.data;
  const imgExt = img.ext;
  const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt);
  return resizedFiile;
};

/**
 * @description converts timestamp to milliseconds since epoch
 * @param {string} date
 * @returns {number}
 */
export const convertDateToUnix = (date) => new Date(date).valueOf();

/**
 * @description creates a new datestamp
 */
const createDate = (timestamp) => new Date(timestamp);

/**
 * @description formats date to UTC
 */
export const formatToUtc = (date = createDate()) => {
  return (
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    ("00" + date.getDate()).slice(-2) +
    "/" +
    date.getFullYear() +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2)
  );
};

/**
 * @description gets query parameter by name from url
 * @param {*} name
 * @returns
 */
export const getQueryParameterByName = (name) => {
  const match = RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
};

/**
 * gets a cookie from storage
 * @param {string} name
 * @returns {string}
 */
export const getCookie = (name) => {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * sets a new cookie
 * @param {string} name
 * @param {string} value
 * @param {string} path
 * @param {string} days
 */
export const setCookie = (name, value, path = "/", days) => {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  document.cookie = name + "=" + (value || "") + expires + "; path=" + path;
};

/**
 * clears the value of a cookie
 * @param {string} name
 */
export const clearCookie = (name) => {
  setCookie(name, "");
};

/**
 * deletes a cookie
 * @param {string} name
 */
export const deleteCookie = (name, path = "/") => {
  setCookie(name, "", path, "Thu, 01 Jan 1970 00:00:01 GMT");
};

/**
 * encodes the cookie in json format
 * @param {*} cookie
 * @returns {string}
 */
export const encodeCookie = (cookie) => JSON.stringify(cookie);

/**
 * decodes a cookie
 * @param {string} cookie
 * @returns {*}
 */
export const decodecookie = (cookie) => JSON.parse(cookie);

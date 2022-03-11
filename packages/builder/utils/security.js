const jwt = require("jsonwebtoken");
const config = require("./config");
const { createTimestamp, generateRandomId } = require("./utils");

const {
  security: { secret },
} = config;

/**
 * creates a json web token
 * @param {*} data
 * @param {string} expiry
 * @returns {*}
 */
const createJwToken = (data, expiry = "1d") =>
  jwt.sign(
    {
      data,
      timestamp: createTimestamp(),
      nonce: generateRandomId(),
      expiry,
    },
    secret
  );

module.exports = {
  createJwToken,
};

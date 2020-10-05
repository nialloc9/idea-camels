const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("./config");
const errors = require("./errors");
const {
  generateRandomId,
  createTimestamp,
  parseBody,
  logger,
} = require("./utils");

const {
  jwt: { secret },
} = config;

/**
 * verifys a token using secret
 * @param {string} jwToken
 * @returns {*}
 */
const jwtVerify = (jwToken) => {
  try {
    return jwt.verify(jwToken, secret);
  } catch (err) {
    return Promise.reject(errors["1004"]());
  }
};

/**
 * creates a json web token
 * @param {*} data
 * @param {string} expiry
 * @returns {*}
 */
const createJwToken = (data, expiry) =>
  jwt.sign(
    {
      data,
      timestamp: createTimestamp(),
      nonce: generateRandomId(),
      expiry,
    },
    secret
  );

/**
 * checks if required paramter is present
 * @param {*} param0
 */

const requiredParam = ({ serviceName, paramName, param, caller }) => {
  if (param === undefined || (!param && param !== 0)) {
    return Promise.reject(
      errors["3002"]({
        service: serviceName,
        caller,
        data: { [paramName]: "undefined" },
      })
    );
  }

  return Promise.resolve();
};

/**
 * @description checks required params
 * @param {string} service
 * @param {[*]} params
 * @param {[string]} required
 * @param {bool} isAuth
 * @returns {<Promise>}
 */
const requiredParams = ({ service, params, required, isAuth = true }) =>
  new Promise((resolve, reject) => {
    const mandatory = isAuth ? [...required, "token"] : required;

    const { caller } = params;

    mandatory.forEach((o) => {
      const target = params[o];
      if (target === undefined || (!target && target !== 0)) {
        return reject(
          errors["2003"]({
            service,
            caller,
            data: { [o]: "undefined" },
          })
        );
      }
    });

    resolve(params);
  });

const createHash = (secret, data, algo = "sha256") =>
  crypto.createHmac(algo, secret).update(data).digest("hex");

/**
 * @description validates and parses event
 * @param {*} param0
 */
const validateAndParse = async ({ event, service, required, isAuth }) => {
  const body = parseBody(event);

  logger.info({ service, body }, "INCOMING");

  await requiredParams({ service, params: body, required, isAuth });

  if (isAuth) {
    const { token } = body;
    const decodedToken = jwtVerify(token);
    body.decodedToken = decodedToken;
    delete body.token;
  }

  return Promise.resolve(body);
};

module.exports = {
  jwtVerify,
  createJwToken,
  requiredParam,
  requiredParams,
  createHash,
  validateAndParse,
};

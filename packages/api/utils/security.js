const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("./config");
const errors = require("./errors");
const { generateRandomId, createTimestamp, logger } = require("./utils");

/**
 * verifys a token using secret
 * @param {string} jwToken
 * @returns {*}
 */
const jwtVerify = (
  { token, secret = config.jwt.secret } = {},
  { provider = jwt } = {}
) => {
  try {
    return [null, provider.verify(token, secret)];
  } catch (err) {
    return [errors["1004"](), null];
  }
};

const scrubAccount = (account = {}, scrub = ["password"]) => {
  const newAccount = { ...account };
  scrub.forEach((o) => {
    delete newAccount[o];
  });

  return newAccount;
};

/**
 * creates a json web token
 * @param {*} data
 * @param {string} expiry
 * @returns {*}
 */
const createJwToken = (
  { data, expiry = "1d", secret = config.jwt.secret } = {},
  { provider = jwt } = {}
) =>
  provider.sign(
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
      errors["2003"]({
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
 * @returns {<Promise>}
 */
const requiredParams = ({
  endpoint,
  body,
  headers,
  isAuth = false,
  isAdmin = false,
  required,
}) =>
  new Promise((resolve, reject) => {
    const { caller } = body;

    const { Authorization, authorization } = headers;

    const bearer = Authorization || authorization;

    if ((isAuth || isAdmin) && !bearer) {
      reject(
        errors["2003"]({
          endpoint,
          caller,
          data: { "authorisation token": "undefined" },
        })
      );

      return;
    }

    required.forEach((o) => {
      const target = body[o];
      if (target === undefined || (!target && target !== 0)) {
        reject(
          errors["2003"]({
            endpoint,
            caller,
            data: { [o]: "undefined" },
          })
        );

        return;
      }
    });

    resolve(body);
  });

const createHash = (
  { secret, data, algo = "sha256" } = {},
  { provider = crypto } = {}
) => provider.createHmac(algo, secret).update(data).digest("hex");

/**
 * @description creates a hash of the password using standard security practice
 * @param {*} param0
 * @returns
 */
const createPasswordHash = ({
  password,
  secret = config.security.password_secret,
} = {}) =>
  createHash({
    secret,
    data: password,
  });

const validatePassword = ({
  password,
  hashedPassword,
  caller,
  service = "login service",
}) =>
  new Promise((resolve, reject) => {
    const inputHash = createPasswordHash({ password });

    if (inputHash !== hashedPassword) {
      reject(
        errors["1003"]({
          service,
          caller,
        })
      );

      return;
    }

    return resolve();
  });

const logIncoming = ({ endpoint, headers, body }) => {
  if (
    endpoint === "/account/create" ||
    endpoint === "/account/login" ||
    endpoint === "/account/update"
  ) {
    return logger.info(
      {
        endpoint,
        headers,
        body: { ...body, data: { ...body.data, password: "*********" } },
      },
      "INCOMING"
    );
  }

  logger.info({ endpoint, headers, body }, "INCOMING");
};
/**
 * @description validates and parses req
 * @param {*} param0
 */
const validateAndParse = async ({
  uri: endpoint,
  req: { headers, body },
  required,
  isAuth = true,
  isAdmin = false,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      logIncoming({ endpoint, headers, body });

      await requiredParams({
        endpoint,
        body,
        headers,
        required,
        isAuth,
        isAdmin,
      });

      const response = { ...body };

      if (isAuth || isAdmin) {
        const { Authorization, authorization } = headers;

        const bearer = Authorization || authorization;

        const [, token] = bearer.split(" ");

        const [error, decodedToken] = jwtVerify({
          token,
          secret: isAdmin ? config.jwt.adminSecret : config.jwt.secret,
        });

        if (error) return reject(error);

        response.decodedToken = decodedToken;
      }

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  jwtVerify,
  createJwToken,
  requiredParam,
  requiredParams,
  createHash,
  createPasswordHash,
  validateAndParse,
  validatePassword,
  scrubAccount,
};

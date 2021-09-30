const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("./config");
const errors = require("./errors");
const {
  generateRandomId,
  createTimestamp,
  logger
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
    return [null, jwt.verify(jwToken, secret)];
  } catch (err) {
    return [errors["1004"](), null]
  }
};

const scrubAccount = (account = {}, scrub = ["password"]) => {
  const newAccount = {...account};

  scrub.forEach(o => {
    delete newAccount[o]
  })

  return newAccount
};

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
 * @returns {<Promise>}
 */
const requiredParams = ({ endpoint, body, headers, isAuth = false, required }) =>
  new Promise((resolve, reject) => {

    const { caller } = body;

    const { Authorization, authorization } = headers;
    
    const bearer = Authorization || authorization;

    if(isAuth && !bearer) {
      reject(
        errors["2003"]({
          endpoint,
          caller,
          data: { "authorisation token": "undefined" },
        })
      );

      return
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

        return
      }
    });

    resolve(body);
  });

const createHash = ({ secret, data, algo = "sha256" }) =>
  crypto.createHmac(algo, secret).update(data).digest("hex");

const validatePassword = ({ password, hashedPassword, caller, service = 'login service' }) => new Promise((resolve, reject) => {
  const inputHash = createHash({ secret: config.security.password_secret, data: password });

  if(inputHash !== hashedPassword) {
    reject(errors["1003"]({
      service,
      caller
    }))

    return
  }

  return resolve();
})
/**
 * @description validates and parses req
 * @param {*} param0
 */
const validateAndParse = async ({ uri: endpoint, req: { headers, body }, required, isAuth = true }) => new Promise(async (resolve, reject) => {
  try {
    logger.info({ endpoint, headers, body }, "INCOMING");
  
    await requiredParams({ endpoint, body, headers, required, isAuth });

    const response = { ...body };
  
    if (isAuth) {
      const { Authorization, authorization } = headers;
      
      const bearer = Authorization || authorization;

      const [,token] = bearer.split(" ");

      const [error, decodedToken] = jwtVerify(token);
      
      if(error) return reject(error);

      response.decodedToken = decodedToken;
    }

    resolve(response);
  } catch (error) {
    reject(error)
  }
});

module.exports = {
  jwtVerify,
  createJwToken,
  requiredParam,
  requiredParams,
  createHash,
  validateAndParse,
  validatePassword,
  scrubAccount
};

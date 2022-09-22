const mysql = require("mysql");
const config = require("./config");
const errors = require("./errors");
const { logger } = require("./utils");

const {
  db: { host, user, password, database, port },
} = config;

const IdeaCamelsDatabasePool = mysql.createPool({
  host,
  user,
  password,
  database,
  port,
});

const getConnection = async (
  { caller } = {},
  { databasePool } = { databasePool: IdeaCamelsDatabasePool }
) =>
  new Promise((resolve, reject) => {
    databasePool.getConnection((error, connection) => {
      if (error) {
        logger.error(error, "DATABASE CONNECTION ERROR");
        return reject(
          errors["4000"]({
            caller,
            reason: error.message,
            data: {
              error,
            },
          })
        );
      }

      return resolve(connection);
    });
  });

const query = async (queryString, data, caller, dataLayer, newConnection) =>
  new Promise(async (resolve, reject) => {
    try {
      const connection = newConnection || (await getConnection({ caller }));
      connection.query(queryString, data, (error, results) => {
        connection.release();

        if (error) {
          logger.error(error, "DATABASE QUERY ERROR");
          return reject(
            errors["4001"]({
              dataLayer,
              reason: `FAILED QUERY: ${queryString}`,
              caller,
              reason: error.message,
            })
          );
        }

        return resolve(results);
      });
    } catch (error) {
      logger.error(
        {
          error,
          query,
        },
        "QUERY_FUNCTION"
      );
      return reject(
        errors["4001"]({
          dataLayer,
          reason: `FAILED QUERY: ${query}`,
          caller,
          reason: error.message,
        })
      );
    }
  });

const ping = async (newConnection) =>
  new Promise(async (resolve, reject) => {
    const connection =
      newConnection || (await getConnection({ caller: "ping" }));

    connection.ping((error) => {
      if (error) {
        return reject(
          errors["4000"]({
            caller,
            reason: error.message,
          })
        );
      }

      resolve();
    });
  });

module.exports = {
  getConnection,
  query,
  ping,
};

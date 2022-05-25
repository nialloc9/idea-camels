const mysql = require("mysql");
const config = require("./config");
const errors = require("./errors");
const { logger } = require("./utils");

const {
  db: { host, user, password, database, port },
} = config;
console.log({
  host,
  user,
  password,
  database,
  port,
});
const DatabasePool = mysql.createPool({
  host,
  user,
  password,
  database,
  port,
});

const getConnection = async () =>
  new Promise((resolve, reject) => {
    DatabasePool.getConnection((error, connection) => {
      if (error) {
        logger.error(error, "DB CONNECT");
        reject(
          errors["4000"]({
            reason: error.message,
          })
        );

        return;
      }

      return resolve(connection);
    });
  });

const query = async (query, data, dataLayer, newConnection) =>
  new Promise(async (resolve, reject) => {
    console.log('newConnection', newConnection)
    const connection = newConnection || (await getConnection());

    connection.query(query, data, (error, results) => {
      connection.release();

      if (error) {
        logger.error(error, "DB QUERY");
        reject(
          errors["4001"]({
            dataLayer,
            reason: `FAILED QUERY: ${query}`,
            reason: error.message,
          })
        );

        return;
      }

      return resolve(results);
    });
  });

module.exports = {
  getConnection,
  query,
};

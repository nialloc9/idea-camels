const myql = require("mysql");
const { config } = require("../utils/config");
const errors = require("../utils/errors");

const {
  db: { host, user, password, database, port },
} = config;

const DatabasePool = myql.createPool({
  host,
  user,
  password,
  database,
  port,
});

const getConnection = async (caller, dataLayer) =>
  new Promise((resolve, reject) => {
    DatabasePool.getConnection((error, connection) => {
      if (error) {
        return reject(
          errors["4000"]({
            caller,
            dataLayer,
            reason: error.message,
          })
        );
      }

      return resolve(connection);
    });
  });

const query = async (query, data, caller, dataLayer, newConnection) => {
  const connection = newConnection || (await getConnection(caller, dataLayer));

  connection.query(query, data, (error, results) => {
    connection.release();

    if (error) {
      return reject(
        errors["4001"]({
          dataLayer,
          caller,
          reason: error.message,
        })
      );
    }

    return resolve(results);
  });
};

module.exports = {
  getConnection,
  query,
};

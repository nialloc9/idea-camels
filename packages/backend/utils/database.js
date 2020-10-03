const myql = require("mysql");
const config = require("../utils/config");
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

const getConnection = async (caller) =>
  new Promise((resolve, reject) => {
    DatabasePool.getConnection((error, connection) => {
      console.log("error1", error);
      if (error) {
        return reject(
          errors["4000"]({
            caller,
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
    console.log("results", results);
    if (error) {
      return Promise.reject(
        errors["4001"]({
          dataLayer,
          caller,
          reason: error.message,
        })
      );
    }

    return Promise.resolve(results);
  });
};

module.exports = {
  getConnection,
  query,
};

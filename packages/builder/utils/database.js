const mysql = require("mysql");
const config = require("./config");
const errors = require("./errors");

const {
  db: { host, user, password, database, port },
} = config;

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
        return reject(
          errors["4000"]({
            reason: error.message,
          })
        );
      }

      return resolve(connection);
    });
  });

const query = async (query, data, dataLayer, newConnection) =>
  new Promise(async (resolve, reject) => {
    const connection =
      newConnection || (await getConnection());
    connection.query(query, data, (error, results) => {
      connection.release();
      
      if (error) {
        reject(
          errors["4001"]({
            dataLayer,
            reason: `FAILED QUERY: ${query}`,
            reason: error.message,
          })
        );
      }

      return resolve(results);
    });
  });
  
module.exports = {
  getConnection,
  query
};

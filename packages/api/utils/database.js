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

const getConnection = async (caller) =>
  new Promise((resolve, reject) => {
    DatabasePool.getConnection((error, connection) => {
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

const query = async (query, data, caller, dataLayer, newConnection) =>
  new Promise(async (resolve, reject) => {
    try {
      const connection =
      newConnection || (await getConnection(caller, dataLayer));
      connection.query(query, data, (error, results) => {
        connection.release();
        
        if (error) {
          return reject(
            errors["4001"]({
              dataLayer,
              reason: `FAILED QUERY: ${query}`,
              caller,
              reason: error.message,
            })
          );
        }

        return resolve(results);
      });
    } catch(error) {
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
  
module.exports = {
  getConnection,
  query
};

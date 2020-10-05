const { fetchDomains } = require("./fetchDomains");

exports.handler = async (event, context, callback) => {
  const response = await fetchDomains(event);

  callback(null, response);
};

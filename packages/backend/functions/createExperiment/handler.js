const { fetchDomains } = require("./createExperiment");

exports.handler = async (event, context, callback) => {
  const response = await fetchDomains(event);

  callback(null, response);
};

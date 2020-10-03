const { purchaseDomain } = require("./purchaseDomain");

exports.handler = async (event, context, callback) => {
  const response = await purchaseDomain(event);

  callback(null, response);
};

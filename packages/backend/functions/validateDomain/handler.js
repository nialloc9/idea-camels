const { validateDomain } = require("./validateDomain");

exports.handler = async (event, context, callback) => {
  const response = await validateDomain(event);

  callback(null, response);
};

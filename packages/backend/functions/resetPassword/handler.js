const { resetPassword } = require("./resetPassword");

exports.handler = async (event, context, callback) => {
  const response = await resetPassword(event);

  callback(null, response);
};

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

module.exports = [
  bodyParser.json(),
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  }),
  cookieParser(),
];

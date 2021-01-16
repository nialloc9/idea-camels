const hpp = require("hpp");
const helmet = require("helmet");
const csp = require("helmet-csp");
const cors = require('cors');
const config = require('../utils/config')

const corsOptions = {
    origin: (origin, callback) => {
      if (config.security.whitelist.includes(origin) || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

module.exports = [
    /**
   * Cleans up headers
   */
    helmet(),

    /**
   * protects against http param pullution attacks
   */
    hpp(),

    /**
   * content security policy
   * @https://www.npmjs.com/package/helmet-csp
   */
    csp({
        // Specify directives as normal.
        directives: {
            defaultSrc: ["'self'", "default.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["style.com"],
            fontSrc: ["'self'", "fonts.com"],
            imgSrc: ["img.com", "data:"],
            sandbox: ["allow-forms", "allow-scripts"],
            reportUri: "/report-violation",
            objectSrc: ["'none'"]
        },

        // Set to true if you only want browsers to report errors, not block them.
        // You may also set this to a function(req, res) in order to decide dynamically
        // whether to use reportOnly mode, e.g., to allow for a dynamic kill switch.
        reportOnly: false
    }),

    cors(corsOptions)
];

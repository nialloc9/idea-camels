const express = require("express");
const middleware = require("./middleware");
const config = require("./utils/config");
const { sendResponse, sendError, endpoints } = require("./utils/server");
const { validateAndParse } = require("./utils/security");
const { logger } = require("./utils/utils");
const { sendEmail } = require("./utils/mailer/mailer");

const app = express();

app.use(...middleware);

// Don't expose any software information to potential hackers.
app.disable("x-powered-by");

endpoints.forEach(({ uri, required = [], isAuth = false, isAdmin=false, func }) =>
  app.post(uri, async (req, res) => {
    try {
      const data = await validateAndParse({ uri, req, required, isAuth, isAdmin });

      const payload = await func({ data, uri, caller: data.caller });

      const response = { payload, uri, code: 200, caller: data.caller };

      return sendResponse(res, response);
    } catch (error) {
      logger.error(error);
      try {
        await sendEmail({ subject: 'ERROR', from: 'noreply@ideacamels.com', to: config.company.support.email, text: JSON.stringify({error: JSON.stringify(error), uri, caller: req.body.caller} ) })
      } catch(sendEmailError) {
        logger.error(sendEmailError);
      }
      return sendError(res, { error, uri, caller: req.body.caller });
    }
  })
);

app.listen(config.port, async () =>
  logger.info(`Listening on port: ${config.port}`)
);

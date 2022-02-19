const express = require("express");
const middleware = require("./middleware");
const config = require("./utils/config");
const { sendResponse, sendError, endpoints } = require("./utils/server");
const { validateAndParse } = require("./utils/security");
const { logger } = require("./utils/utils");

const app = express();

app.use(...middleware);

// Don't expose any software information to potential hackers.
app.disable("x-powered-by");

endpoints.forEach(({ uri, required = [], isAuth = false, func }) =>
  app.post(uri, async (req, res) => {
    try {
      const data = await validateAndParse({ uri, req, required, isAuth });

      const payload = await func({ data, uri, caller: data.caller });

      const response = { payload, uri, code: 200, caller: data.caller };

      return sendResponse(res, response);
    } catch (error) {
      console.log(error);
      return sendError(res, { error, uri, caller: req.body.caller });
    }
  })
);

app.listen(config.port, async () =>
  logger.info(`Listening on port: ${config.port}`)
);

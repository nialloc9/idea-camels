const express = require("express");
const middleware = require("./middleware");
const config = require("./utils/config");
const { sendResponse, sendError, endpoints } = require('./utils/server');
const { validateAndParse } = require('./utils/security');

const app = express();

app.use(...middleware)

// Don't expose any software information to potential hackers.
app.disable("x-powered-by");

app.get('/health-check', (req, res) => res.send({ status: 200 }));

endpoints.forEach(({ uri, required = [], isAuth = false, func }) =>
  app.post(uri, async (req, res) =>
    {
        try {
            const data = await validateAndParse({ uri, req, required, isAuth })
            
            const payload = await func({ data, req, uri, caller: data.caller });
            
            return sendResponse(res, { payload, uri })
        } catch(error) {
            console.log("ero", error)
            return sendError(res, { error, uri })
        }
    }
  )
);

app.listen(config.port, async () =>
  console.info(`Listening on port: ${config.port}`)
);

const express = require("express");
const bodyParser = require("body-parser");
const config = require("./utils/config");
const { sendResponse, sendError, endpoints } = require('./utils/server');
const { validateAndParse } = require('./utils/security');

const app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.get('/health-check', (req, res) => res.send({ status: 200 }));

endpoints.forEach(({ uri, required = [], isAuth = false, func }) =>
  app.post(uri, async (req, res) =>
    {
        try {
            const data = await validateAndParse({ uri, req, required, isAuth })
            const response = await func({ data, req, uri });
          
            return sendResponse(res, response)
        } catch(error) {
            return sendError(res,error)
        }
    }
  )
);

app.listen(config.port, async () =>
  console.info(`Listening on port: ${config.port}`)
);

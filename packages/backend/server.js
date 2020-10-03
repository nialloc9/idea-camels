const express = require("express");
const bodyParser = require("body-parser");
const { config } = require("./config");
const { validateDomain } = require("./functions/validateDomain/validateDomain");
const { purchaseDomain } = require("./functions/purchaseDomain/purchaseDomain");

const app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.post("/validate-domain", async ({ body }, res) =>
  res.send(await validateDomain({ body: JSON.stringify(body) }))
);
app.post("/purchase-domain", async ({ body }, res) =>
  res.send(await purchaseDomain({ body: JSON.stringify(body) }))
);

app.listen(config.port, () =>
  console.info(`Listening on port: ${config.port}`)
);

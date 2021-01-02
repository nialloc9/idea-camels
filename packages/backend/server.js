const express = require("express");
const bodyParser = require("body-parser");
const config = require("./utils/config");
const { validateDomain } = require("./functions/validateDomain/validateDomain");
const { purchaseDomain } = require("./functions/purchaseDomain/purchaseDomain");
const { fetchDomains } = require("./functions/fetchDomains/fetchDomains");
const {
  createExperiment,
} = require("./functions/createExperiment/createExperiment");
const {
  fetchExperiments,
} = require("./functions/fetchExperiments/fetchExperiments");
const { createAccount } = require("./functions/createAccount/createAccount");

const app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.get('/health-check', (req, res) => res.send({ status: 200 }));

[
  {
    uri: "/validate-domain",
    func: validateDomain,
  },
  {
    uri: "/purchase-domain",
    func: purchaseDomain,
  },
  {
    uri: "/fetch-domains",
    func: fetchDomains,
  },
  {
    uri: "/create-experiment",
    func: createExperiment,
  },
  {
    uri: "/fetch-experiments",
    func: fetchExperiments,
  },
  {
    uri: "/create-account",
    func: createAccount,
  },
].forEach(({ uri, func }) =>
  app.post(uri, async ({ body, headers }, res) =>
    res.send(await func({ body: JSON.stringify(body), headers }))
  )
);

app.listen(config.port, async () =>
  console.info(`Listening on port: ${config.port}`)
);

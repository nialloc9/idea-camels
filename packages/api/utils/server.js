const config = require("./config");
const {
  onCreate: onCreateAccount,
  onLogin,
  onDelete,
  onUpdate,
  onForgottonPassword,
  onReauthorise,
} = require("../service/account");

const {
  onGetAccountDomains,
  onPurchaseDomain,
  onListDomainPrices,
  onCheckIsDomainAvailable,
  onCreateSubDomain,
} = require("../service/domain");
const {
  onGetAccountExperiments,
  onCreateExperiment,
} = require("../service/experiment");
const {
  onHealthCheck,
  onDBHealthCheck,
  onGoogleAdsCheck,
  onEmailCheck,
  onAlertCheck,
} = require("../service/healthCheck");
const { getSignedUrl } = require("../service/upload");
const { onAddCard, onChargeCustomer } = require("../service/payment");
const { onCreateLead } = require("../service/lead");
const { onGetAdPerformance } = require("../service/report");
const { onLogError } = require("../service/log");
const { onManuallyRunExperiment } = require("../service/admin");
const { logger } = require("./utils");
const { sendAlert } = require("./alert");

/**
 * @description sends a response and logs the response
 * @param {*} res
 * @param {*} payload
 * @param {int} code default 200
 * @returns {func}
 */
const sendResponse = (res, { payload, code = 200, uri, message }) => {
  if (config.logSuccessResponse) {
    logger.info({ payload, code, uri, message }, "SUCCESS OUTGOING RPC");
  }

  return res.status(code).send(payload);
};

/**
 * @description formats and sends a response error
 * @param {*} res
 * @param {*} error
 * @return {func}
 */
const sendError = async (res, { error = {}, uri, status = 500, caller }) => {
  if (config.logErrorResponse) {
    logger.error({ err: error, uri, status, caller }, "ERROR OUTGOING RPC");
    const { error: alertError } = await sendAlert({
      channel: "api-prod-alerts",
      text: JSON.stringify(error),
    });

    if (alertError) {
      logger.error(alertError, "ALERT ERROR");
    }
  }

  if (config.isProd && error.reason) delete error.reason;

  return res.status(status).send(error);
};

const endpoints = [
  {
    uri: "/account/create",
    func: onCreateAccount,
    required: ["email", "firstName", "password", "phone", "caller"],
  },
  {
    uri: "/account/login",
    func: onLogin,
    required: ["email", "password", "caller"],
  },
  {
    uri: "/account/update",
    func: onUpdate,
    required: ["updateData", "caller"],
    isAuth: true,
  },
  {
    uri: "/account/delete",
    required: ["caller"],
    func: onDelete,
    isAuth: true,
  },
  {
    uri: "/account/forgotton-password",
    required: ["caller", "email"],
    func: onForgottonPassword,
  },
  {
    uri: "/account/reauthorise",
    required: ["caller"],
    func: onReauthorise,
    isAuth: true,
  },
  {
    uri: "/domain/get-by-account",
    required: ["caller"],
    func: onGetAccountDomains,
    isAuth: true,
  },
  {
    uri: "/domain/purchase",
    func: onPurchaseDomain,
    required: ["domain", "caller"],
    isAuth: true,
  },
  {
    uri: "/domain/create-sub-domain",
    func: onCreateSubDomain,
    required: ["subDomain", "caller"],
    isAuth: true,
  },
  {
    uri: "/domain/get-prices",
    func: onListDomainPrices,
    required: ["caller"],
    isAuth: true,
  },
  {
    uri: "/domain/check-if-available",
    func: onCheckIsDomainAvailable,
    required: ["caller", "domain"],
    isAuth: true,
  },
  {
    uri: "/experiment/get-by-account",
    required: ["caller"],
    func: onGetAccountExperiments,
    isAuth: true,
  },
  {
    uri: "/experiment/create",
    func: onCreateExperiment,
    required: [
      "domainRef",
      "content",
      "theme",
      "endDate",
      "budget",
      "templateRef",
      "headline",
      "headline2",
      "keywords",
      "caller",
    ],
    isAuth: true,
  },
  {
    uri: "/upload/get-upload-url",
    required: ["caller", "type"],
    func: getSignedUrl,
    isAuth: true,
  },
  {
    uri: "/payment/charge-customer",
    required: ["amount", "caller", "type"],
    func: onChargeCustomer,
    isAuth: true,
  },
  {
    uri: "/payment/add-card",
    required: ["cardToken", "caller"],
    func: onAddCard,
    isAuth: true,
  },
  {
    uri: "/lead/create",
    required: ["email", "caller"],
    func: onCreateLead,
    isAuth: true,
  },
  {
    uri: "/log/error",
    required: [],
    func: onLogError,
  },
  {
    uri: "/report/get-ad-performance",
    required: [],
    func: onGetAdPerformance,
  },
  {
    uri: "/backend/run-experiment",
    required: [
      "domain",
      "experimentRef",
      "accountRef",
      "themeKey",
      "contentKey",
      "templateRef",
      "description",
      "headline",
      "headline2",
      "keywords",
      "caller",
      "budget",
    ],
    // isAdmin: true,
    func: onManuallyRunExperiment,
  },
  {
    uri: "/health-check",
    required: [],
    func: onHealthCheck,
  },
  {
    uri: "/health-check-2",
    required: [],
    func: onDBHealthCheck,
  },
  {
    uri: "/health-check-3",
    required: [],
    func: onGoogleAdsCheck,
  },
  {
    uri: "/health-check-4",
    required: [],
    func: onEmailCheck,
  },
  {
    uri: "/health-check-5",
    required: [],
    func: onAlertCheck,
  },
];

module.exports = {
  sendResponse,
  sendError,
  endpoints,
};

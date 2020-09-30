const microService = {
  1000: ({ endpoint, service, dataLayer, caller, reason, data }) => ({
    message: "email already in use",
    code: 1000,
    endpoint,
    service,
    dataLayer,
    caller,
    reason,
    data,
  }),
};

const misc = {
  2000: ({ endpoint, service, dataLayer, caller, reason, data }) => ({
    message: "provider error",
    code: 2000,
    endpoint,
    service,
    dataLayer,
    caller,
    reason,
    data,
  }),
};

const database = {
  4000: ({ endpoint, service, dataLayer, caller, reason, data }) => ({
    message: "could not connect to database",
    code: 4000,
    endpoint,
    service,
    dataLayer,
    caller,
    reason,
    data,
  }),
  4001: ({ endpoint, service, dataLayer, caller, reason, data }) => ({
    message: "could not complete query",
    code: 4001,
    endpoint,
    service,
    dataLayer,
    caller,
    reason,
    data,
  }),
};

module.exports = {
  ...microService,
  ...misc,
  ...database,
};

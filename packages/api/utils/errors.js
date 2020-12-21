const service = {
  1000: ({ endpoint, service, dataLayer, caller, reason, data } = {}) => ({
    message: "email already in use",
    code: 1000,
    endpoint,
    service,
    dataLayer,
    caller,
    reason,
    data,
  }),
  1001: ({ endpoint, service, dataLayer, caller, reason, data } = {}) => ({
    message: "domain not owned by account",
    code: 1001,
    endpoint,
    service,
    dataLayer,
    caller,
    reason,
    data,
  }),
  1002: ({ endpoint, service, dataLayer, caller, reason, data } = {}) => ({
    message: "account not found",
    code: 1002,
    endpoint,
    service,
    dataLayer,
    caller,
    reason,
    data,
  }),
  1003: ({ endpoint, service, dataLayer, caller, reason, data } = {}) => ({
    message: "invalid email/password combination",
    code: 1003,
    endpoint,
    service,
    dataLayer,
    caller,
    reason,
    data,
  }),
  1004: ({ endpoint, service, dataLayer, caller, reason, data } = {}) => ({
    message: "invalid token",
    code: 1004,
    endpoint,
    service,
    dataLayer,
    caller,
    reason,
    data,
  }),
  1005: ({ endpoint, service, dataLayer, caller, reason, data } = {}) => ({
    message: "domain not available",
    code: 1005,
    endpoint,
    service,
    dataLayer,
    caller,
    reason,
    data,
  }),
  1006: ({ endpoint, service, dataLayer, caller, reason, data } = {}) => ({
    message: "failed to register domain with registrar",
    code: 1006,
    endpoint,
    service,
    dataLayer,
    caller,
    reason,
    data,
  }),
};

const misc = {
  2000: ({ endpoint, service, dataLayer, caller, reason, data } = {}) => ({
    message: "provider error",
    code: 2000,
    endpoint,
    service,
    dataLayer,
    caller,
    reason,
    data,
  }),
  2001: ({ endpoint, service, dataLayer, caller, reason, data } = {}) => ({
    message: "unknwon error",
    code: 2001,
    endpoint,
    service,
    dataLayer,
    caller,
    reason,
    data,
  }),
  2003: ({ endpoint, service, dataLayer, caller, reason, data }) => ({
    message: "required param missing",
    code: 2003,
    endpoint,
    service,
    dataLayer,
    caller,
    reason,
    data,
  }),
  2004: ({ endpoint, service, dataLayer, caller, reason, data }) => ({
    message: "could not send mail",
    code: 2004,
    endpoint,
    service,
    dataLayer,
    caller,
    reason,
    data,
  }),
};

const database = {
  4000: ({ endpoint, service, dataLayer, caller, reason, data } = {}) => ({
    message: "could not connect to database",
    code: 4000,
    endpoint,
    service,
    dataLayer,
    caller,
    reason,
    data,
  }),
  4001: ({ endpoint, service, dataLayer, caller, reason, data } = {}) => ({
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
  ...service,
  ...misc,
  ...database,
};

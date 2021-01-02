const service = {
    1000: ({ endpoint, service, dataLayer, reason, data } = {}) => ({
      message: "invalid token",
      code: 1004,
      endpoint,
      service,
      dataLayer,
      reason,
      data,
    })
  };
  
  const misc = {
    2000: ({ endpoint, service, dataLayer, reason, data } = {}) => ({
      message: "provider error",
      code: 2000,
      endpoint,
      service,
      dataLayer,
      reason,
      data,
    }),
    2001: ({ endpoint, service, dataLayer, reason, data } = {}) => ({
      message: "unknwon error",
      code: 2001,
      endpoint,
      service,
      dataLayer,
      reason,
      data,
    }),
    2003: ({ endpoint, service, dataLayer, reason, data }) => ({
      message: "required param missing",
      code: 2003,
      endpoint,
      service,
      dataLayer,
      reason,
      data,
    }),
    2004: ({ endpoint, service, dataLayer, reason, data }) => ({
      message: "could not send mail",
      code: 2004,
      endpoint,
      service,
      dataLayer,
      reason,
      data,
    }),
  };
  
  const database = {
    4000: ({ endpoint, service, dataLayer, reason, data } = {}) => ({
      message: "could not connect to database",
      code: 4000,
      endpoint,
      service,
      dataLayer,
      reason,
      data,
    }),
    4001: ({ endpoint, service, dataLayer, reason, data } = {}) => ({
      message: "could not complete query",
      code: 4001,
      endpoint,
      service,
      dataLayer,
      reason,
      data,
    }),
  };
  
  module.exports = {
    ...service,
    ...misc,
    ...database,
  };
  
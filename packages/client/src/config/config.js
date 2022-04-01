import { logger } from "../utils/utils";

const { NODE_ENV, REACT_APP_BUILD_VERSION = "development-build" } = process.env;

const {
  location: { pathname },
} = window;

const development = {
  buildNumber: REACT_APP_BUILD_VERSION,
  env: NODE_ENV,
  isProd: NODE_ENV === "production",
  pathname,
  social: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
  ga: {
    uaId: "UA-1234567-1",
  },
  hotjar: {
    id: 1234567,
    version: 6,
  },
  api: {
    base: "http://localhost:3001",
  },
  security: {
    default_cookie_expiration: null,
    extended_cookie_expiration: 30,
  },
  payments: {
    publishableKey:
      "pk_test_51KXMllIWny9rFbsQ3XsAORBTBeGFQTXlKIcPKYTCiYS7rPPVb4QJlmQOm1uXxlLJOYqMykAGBpG4snwa0F6lI5UF00GBeiIBlD",
    serviceCharge: 20,
  },
};

const staging = { ...development };

const production = {
  ...staging,
  api: {
    ...staging.api,
    base: "https://ho0gwvmqfa.execute-api.eu-west-1.amazonaws.com/prod",
  },
  ga: {
    ...staging.ga,
    uaId: "UA-173719058-1",
  },
  hotjar: {
    ...staging.hotjar,
    id: 1710788,
    version: 6,
  },
  payments: {
    ...staging.payments,
    publishableKey:
      "pk_live_51KXMllIWny9rFbsQGZrfmEUhExwDecjeMhvE72qJun6uCNXdt4UBpSlHtjCNMdNQMOGzlwcykXBwUa2si2ZZKOIs00HKvOY6zM",
  },
};

const selectedConfig =
  {
    staging,
    production,
  }[NODE_ENV] || development;

logger.info("============== CONFIG ==============", selectedConfig);

export default selectedConfig;

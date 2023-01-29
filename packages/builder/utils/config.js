const {
  ENV,
  AWS_REGION,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  EXPERIMENT_REF,
  ACCOUNT_REF,
  TEMPLATE_REF,
  CALLER,
  DOMAIN,
  THEME_KEY,
  CONTENT_KEY,
  JWT_SECRET,
  BUDGET,
  HEADLINE,
  HEADLINE_2,
  HEADLINE_3,
  DESCRIPTION,
  DESCRIPTION_2,
  KEYWORD_0,
  KEYWORD_1,
  KEYWORD_2,
  KEYWORD_3,
  KEYWORD_4,
  KEYWORD_5,
  GOOGLE_ADS_CLIENT_ID,
  GOOGLE_ADS_CLIENT_SECRET,
  GOOGLE_ADS_REFRESH_TOKEN,
  GOOGLE_ADS_DEVELOPER_TOKEN,
  GOOGLE_ADS_CUSTOMER_ID = "123-123-123",
  SHOULD_LOG_STATUS_IN_DB = "y",
  SLACK_TOKEN,
  API_BASE_URL,
} = process.env;

const localhost = {
  shouldLogStatusInDB: SHOULD_LOG_STATUS_IN_DB == "y",
  webAddress: "https://ideacamels.com",
  env: ENV,
  isProd: ENV === "prod",
  noInternet: false,
  name: "idea-camels-server",
  caller: CALLER,
  company: {
    addressLine1: "99",
    addressLine2: "ashwell house",
    city: "london",
    countryCode: "GB",
    phone: "+44.7532722266",
    email: "ideacamels@gmail.com",
    name: "Idea Camels",
    state: "london",
    postCode: "UB24LR",
    contact: {
      firstName: "Niall",
      lastName: "O'Connor",
    },
  },
  aws: {
    region: AWS_REGION,
    buckets: {
      themesAndContents: "prod-themes",
    },
  },
  db: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
  },
  experiment: {
    experimentRef: EXPERIMENT_REF,
    templateRef: TEMPLATE_REF,
    accountRef: ACCOUNT_REF,
    domain: DOMAIN,
    themeKey: THEME_KEY,
    contentKey: CONTENT_KEY,
    budget: BUDGET,
    headline: HEADLINE,
    headline2: HEADLINE_2,
    headline3: HEADLINE_3,
    description: DESCRIPTION,
    description2: DESCRIPTION_2,
    keyword0: KEYWORD_0,
    keyword1: KEYWORD_1,
    keyword2: KEYWORD_2,
    keyword3: KEYWORD_3,
    keyword4: KEYWORD_4,
    keyword5: KEYWORD_5,
    keywords: [
      KEYWORD_0,
      KEYWORD_1,
      KEYWORD_2,
      KEYWORD_3,
      KEYWORD_4,
      KEYWORD_5,
    ],
  },
  api: {
    baseUrl: API_BASE_URL,
  },
  security: {
    secret: JWT_SECRET,
  },
  payments: {
    serviceCharge: 20,
    domainPercentageMarkUp: 20,
    advertPercentageMarkup: 10,
  },
  slack: {
    token: SLACK_TOKEN,
    alertChannel: "builder-dev-alerts",
    experimentDeployChannel: "deploy-experiment-dev-alerts",
  },
};

const staging = {
  ...localhost,
  noInternet: false,
};

const prod = {
  ...staging,
  isProd: true,
  noInternet: false,
  aws: {
    ...staging.aws,
  },
  slack: {
    ...staging.slack,
    alertChannel: "builder-prod-alerts",
    experimentDeployChannel: "deploy-experiment-prod-alerts",
  },
};

module.exports =
  {
    staging,
    prod,
  }[ENV] || localhost;

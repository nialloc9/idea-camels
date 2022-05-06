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
  DOMAIN='ideacamels.link',
  THEME_KEY,
  CONTENT_KEY,
  JWT_SECRET = "test",
  BUDGET, 
  HEADLINE,
  HEADLINE_2,
  DESCRIPTION,
  KEYWORD_0,
  KEYWORD_1,
  KEYWORD_2,
  KEYWORD_3,
  KEYWORD_4,
  KEYWORD_5,
  GOOGLE_ADS_CLIENT_ID = "541455512087-fgb1bpng97066hgjp9f1q67vrbgm0ht7.apps.googleusercontent.com",
  GOOGLE_ADS_CLIENT_SECRET = "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",
  GOOGLE_ADS_REFRESH_TOKEN = "1//04pgV84bj_fM8CgYIARAAGAQSNwF-L9IrzYIbjpGn4TJQ-NIDgPgYJ4qvaEjm7KlkZeAr5TcM3CTfuY6ERfB64oDSKPZpVrIYRck",
  GOOGLE_ADS_DEVELOPER_TOKEN = "3xrjsEJU_9SaChCM_NUg3Q",
  GOOGLE_ADS_CUSTOMER_ID = "521-347-2317",
  SHOULD_LOG_STATUS_IN_DB = 'y',
  SLACK_TOKEN,
  API_BASE_URL
} = process.env;

const localhost = {
  shouldLogStatusInDB: SHOULD_LOG_STATUS_IN_DB == "y",
  webAddress: "https://ideacamels.com",
  env: ENV,
  isProd: true,
  name: "idea-camels-server",
  caller: CALLER,
  company: {
    addressLine1: "87C",
    addressLine2: "melrose avenue",
    city: "london",
    countryCode: "GB",
    phone: "+44.7532722266",
    email: "ideacamels@gmail.com",
    name: "Idea Camels",
    state: "london",
    postCode: "NW2 4LR",
    contact: {
      firstName: "Niall",
      lastName: "O' Connor",
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
    // accountRef: ACCOUNT_REF,
    accountRef: 1,
    domain: DOMAIN,
    themeKey: THEME_KEY,
    contentKey: CONTENT_KEY,
    budget: BUDGET,
    headline: HEADLINE,
    headline2: HEADLINE_2,
    description: DESCRIPTION,
    keyword0: KEYWORD_0,
    keyword1: KEYWORD_1,
    keyword2: KEYWORD_2,
    keyword3: KEYWORD_3,
    keyword4: KEYWORD_4,
    keyword5: KEYWORD_5,
    keywords: [KEYWORD_0, KEYWORD_1, KEYWORD_2, KEYWORD_3, KEYWORD_4, KEYWORD_5]
  },
  googleAds: {
    clientId: GOOGLE_ADS_CLIENT_ID,
    clientSecret: GOOGLE_ADS_CLIENT_SECRET,
    refreshToken: GOOGLE_ADS_REFRESH_TOKEN,
    developerToken: GOOGLE_ADS_DEVELOPER_TOKEN,
    customerId: GOOGLE_ADS_CUSTOMER_ID,
    customerIdSplit: GOOGLE_ADS_CUSTOMER_ID.split("-").join(""),
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
    token: SLACK_TOKEN
  },
  noInternet: false,
};

const staging = {
  ...localhost,
  noInternet: false,
};

const prod = {
  ...staging,
  aws: {
    ...staging.aws,
  },
};

module.exports =
  {
    staging,
    prod,
  }[ENV] || localhost;

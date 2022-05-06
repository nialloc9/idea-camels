const {
  SERVER_PORT = 80,
  ENV,
  AWS_REGION,
  STRIPE_SECRET_KEY,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  JWT_SECRET,
  PASSWORD_SECRET,
  GOOGLE_ADS_CLIENT_ID = "test",
  GOOGLE_ADS_CLIENT_SECRET = "test",
  GOOGLE_ADS_REFRESH_TOKEN = "test",
  GOOGLE_ADS_DEVELOPER_TOKEN = "test",
  GOOGLE_ADS_CUSTOMER_ID = "123-456-7899",
  BUILDER_CLUSTER_NAME = "ideacamels-prod",
  BUILDER_TASK_NAME = "builder-prod",
  THEMES_BUCKET = `prod-themes`,
  BUILDER_SECURITY_GROUP_ID,
  BUILDER_SUBNET_ID_PUBLIC,
  BUILDER_SUBNET_ID_PRIVATE_0,
  BUILDER_SUBNET_ID_PRIVATE_1,
  SLACK_TOKEN
} = process.env;

const development = {
  port: SERVER_PORT,
  webAddress: "https://ideacamels.com",
  env: ENV,
  isProd: ENV === "prod",
  name: "idea-camels-server",
  security: {
    password_secret: PASSWORD_SECRET,
    default_token_expiration: "1d",
    extended_token_expiration: "30d",
    whitelist: ["http://localhost:3000"],
  },
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
    support: {
      email: "support@ideacamels.com",
      name: "Idea Camels Support Team",
    },
    tagLine: "Carrying your ideas to reality",
  },
  aws: {
    region: AWS_REGION,
    buckets: {
      userImageBucket: THEMES_BUCKET,
    },
    clusters: {
      builder: {
        name: BUILDER_CLUSTER_NAME,
        taskDefinition: BUILDER_TASK_NAME,
        securityGroupId: BUILDER_SECURITY_GROUP_ID,
        subnets: [
          BUILDER_SUBNET_ID_PUBLIC,
          BUILDER_SUBNET_ID_PRIVATE_0,
          BUILDER_SUBNET_ID_PRIVATE_1,
        ],
      },
    },
  },
  stripe: {
    secretKey: STRIPE_SECRET_KEY,
  },
  db: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
  },
  jwt: {
    secret: JWT_SECRET,
  },
  googleAds: {
    clientId: GOOGLE_ADS_CLIENT_ID,
    clientSecret: GOOGLE_ADS_CLIENT_SECRET,
    refreshToken: GOOGLE_ADS_REFRESH_TOKEN,
    developerToken: GOOGLE_ADS_DEVELOPER_TOKEN,
    customerId: GOOGLE_ADS_CUSTOMER_ID,
    customerIdSplit: GOOGLE_ADS_CUSTOMER_ID.split("-").join(""),
  },
  builder: {
    themes: {
      bucketName: THEMES_BUCKET,
    },
  },
  payments: {
    serviceCharge: 20,
    domainPercentageMarkUp: 20,
    advertPercentageMarkup: 10,
  },
  slack: {
    token: SLACK_TOKEN,
    alertChannel: 'api-dev-alerts'
  },
  noInternet: true,
  logSuccessResponse: true,
  logErrorResponse: true,
};

const staging = {
  ...development,
  noInternet: false,
  logSuccessResponse: true,
  logErrorResponse: true,
  slack: {
    token: SLACK_TOKEN,
    alertChannel: 'api-staging-alerts'
  },
};

const prod = {
  ...staging,
  aws: {
    ...staging.aws,
  },
  slack: {
    ...staging.slack,
    alertChannel: 'api-prod-alerts'
  },
};

module.exports =
  {
    staging,
    prod,
  }[ENV] || development;

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
  JWT_ADMIN_SECRET,
  PASSWORD_SECRET,
  GOOGLE_ADS_CLIENT_ID,
  GOOGLE_ADS_CLIENT_SECRET,
  GOOGLE_ADS_REFRESH_TOKEN,
  GOOGLE_ADS_DEVELOPER_TOKEN,
  GOOGLE_ADS_CUSTOMER_ID = "123-123-123",
  BUILDER_CLUSTER_NAME,
  BUILDER_TASK_NAME,
  THEMES_BUCKET,
  BUILDER_SECURITY_GROUP_ID,
  BUILDER_SUBNET_ID_PUBLIC,
  BUILDER_SUBNET_ID_PRIVATE_0,
  BUILDER_SUBNET_ID_PRIVATE_1,
  SLACK_TOKEN,
  MAILCHIMP_API_KEY,
} = process.env;

const development = {
  port: SERVER_PORT,
  webAddress: "https://keyword-optimiser.com",
  env: ENV,
  isProd: ENV === "prod",
  noInternet: false,
  logSuccessResponse: true,
  logErrorResponse: true,
  company: {
    addressLine1: "99",
    addressLine2: "ashwell house",
    city: "london",
    countryCode: "GB",
    phone: "+44.7532722266",
    email: "ideacamels@gmail.com",
    name: "Keyword Optimser",
    state: "london",
    postCode: "UB2 4WJ",
    contact: {
      firstName: "Niall",
      lastName: "O'Connor",
    },
    support: {
      email: "support@ideacamels.com",
      name: "Idea Camels Support Team",
    },
    tagLine: "Do more with less",
  },
  aws: {
    region: AWS_REGION,
    buckets: {
      userImageBucket: THEMES_BUCKET,
    },
    clusters: {
      builder: {
        name: BUILDER_CLUSTER_NAME,
        taskDefinition: "keyword-optimiser",
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
    adminSecret: JWT_ADMIN_SECRET,
  },
  builder: {
    themes: {
      bucketName: THEMES_BUCKET,
    },
  },
  slack: {
    token: SLACK_TOKEN,
    alertChannel: "api-dev-alerts",
    clientErrorChannel: "client-dev-alerts",
  },
  mailChimp: {
    apiKey: MAILCHIMP_API_KEY,
    list: {
      default: "ce57f13efc",
    },
  },
};

const staging = {
  ...development,
  noInternet: false,
  logSuccessResponse: true,
  logErrorResponse: true,
  slack: {
    token: SLACK_TOKEN,
    alertChannel: "api-staging-alerts",
  },
};

const prod = {
  ...staging,
  aws: {
    ...staging.aws,
  },
  slack: {
    ...staging.slack,
    alertChannel: "api-prod-alerts",
    clientErrorChannel: "client-prod-alerts",
  },
  security: {
    ...staging.security,
    whitelist: [
      "http://ideacamels.com",
      "https://ideacamels.com",
      /\.ideacamels\.com$/,
    ],
  },
};

module.exports =
  {
    staging,
    prod,
  }[ENV] || development;

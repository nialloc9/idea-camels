const {
  SERVER_PORT,
  ENV,
  AWS_REGION,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  STRIPE_SECRET_KEY,
  STRIPE_MONTHLY_PLAN,
  STRIPE_SEMI_ANNUAL_PLAN,
  STRIPE_ANNUAL_PLAN,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  JSWT_SECRET,
  PASSWORD_SECRET,
  GOOGLE_ADS_CLIENT_ID,
  GOOGLE_ADS_CLIENT_SECRET,
  GOOGLE_ADS_REFRESH_TOKEN,
  GOOGLE_ADS_DEVELOPER_TOKEN,
  GOOGLE_ADS_CUSTOMER_ID,
} = process.env;

const localhost = {
  port: SERVER_PORT,
  webAddress: "https://ideacamels.com",
  env: ENV,
  isProd: ENV === "production",
  name: "idea-camels-server",
  security: {
    password_secret: PASSWORD_SECRET,
  },
  aws: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: AWS_REGION,
    buckets: {},
    contact: 'ideacamels@gmail.com'
  },
  stripe: {
    secretKey: STRIPE_SECRET_KEY,
    monthlyPlan: STRIPE_MONTHLY_PLAN,
    semiAnnualPlan: STRIPE_SEMI_ANNUAL_PLAN,
    annualPlan: STRIPE_ANNUAL_PLAN,
  },
  db: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
  },
  jwt: {
    secret: JSWT_SECRET,
  },
  googleAds: {
    clientId: GOOGLE_ADS_CLIENT_ID,
    clientSecret: GOOGLE_ADS_CLIENT_SECRET,
    refreshToken: GOOGLE_ADS_REFRESH_TOKEN,
    developerToken: GOOGLE_ADS_DEVELOPER_TOKEN,
    customerId: GOOGLE_ADS_CUSTOMER_ID,
  },
  noInternet: true,
};

const staging = {
  ...localhost,
  noInternet: false,
};

const production = {
  ...staging,
  aws: {
    ...staging.aws,
  },
};

module.exports =
  {
    localhost,
    staging,
    production,
  }[ENV] || localhost;

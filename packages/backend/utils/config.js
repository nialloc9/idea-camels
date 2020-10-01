const {
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  AWS_REGION,
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
  PORT,
  NODE_ENV,
  ENV,
} = process.env;

const localhost = {
  name: "idea-camels-server",
  aws: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: AWS_REGION,
    buckets: {},
  },
  stripe: {
    secretKey: STRIPE_SECRET_KEY,
    monthlyPlan: STRIPE_MONTHLY_PLAN,
    semiAnnualPlan: STRIPE_SEMI_ANNUAL_PLAN,
    annualPlan: STRIPE_ANNUAL_PLAN,
    trialDays: STRIPE_TRIAL_DAYS,
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
  port: PORT,
  env: NODE_ENV,
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

export default {
  localhost,
  staging,
  production,
}[ENV];

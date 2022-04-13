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
  DOMAIN,
  THEME_KEY,
  CONTENT_KEY,
  JWT_SECRET = "test",
} = process.env;

const localhost = {
  shouldLogStatusInDB: false,
  webAddress: "https://ideacamels.com",
  env: ENV,
  isProd: ENV === "production",
  name: "idea-camels-server",
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
    // accountRef: ACCOUNT_REF,
    accountRef: 1,
    domain: DOMAIN,
    themeKey: THEME_KEY,
    contentKey: CONTENT_KEY,
  },
  security: {
    secret: JWT_SECRET,
  },
  noInternet: true,
};

const staging = {
  ...localhost,
  shouldLogStatusInDB: false,
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

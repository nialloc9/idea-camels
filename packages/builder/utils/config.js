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
  BUDGET,
  DOMAIN_REF,
  HEADLINE,
  HEADLINE_2,
  KEYWORD_0,
  KEYWORD_1,
  KEYWORD_2,
  KEYWORD_3,
  KEYWORD_4,
  KEYWORD_5,
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
    budget: BUDGET,
    domainRef: DOMAIN_REF,
    headline: HEADLINE,
    headline2: HEADLINE_2,
    keyword0: KEYWORD_0,
    keyword1: KEYWORD_1,
    keyword2: KEYWORD_2,
    keyword3: KEYWORD_3,
    keyword4: KEYWORD_4,
    keyword5: KEYWORD_5,
  },
  security: {
    secret: JWT_SECRET,
  },
  noInternet: true,
};

const staging = {
  ...localhost,
  shouldLogStatusInDB: true,
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

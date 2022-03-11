const {
  ENV,
  AWS_REGION,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  EXPERIMENT_REF,
  JWT_SECRET = "test",
} = process.env;

const localhost = {
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
  },
  security: {
    secret: JWT_SECRET,
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
console.log(production);
module.exports = production;

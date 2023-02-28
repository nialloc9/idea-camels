const stripe = require("stripe");
const defaultConfig = require("./config");
const { logger } = require("./utils");
const {
  customer: customerMock,
  charge: chargeMock,
  card: cardMock,
} = require("./mocks/stripe");

const stripeProvider = stripe(defaultConfig.stripe.secretKey);

/**
 * @description https://stripe.com/docs/api/customers/retrieve?lang=node
 * @param {*} param0
 * @param {*} dependencies
 * @returns
 */
const getCustomer = async (
  { customerId },
  { provider, config } = { provider: stripeProvider, config: defaultConfig }
) => {
  if (config.noInternet) {
    logger.info(customerMock, "STRIPE_MOCK_CUSTOMER_FOUND");
    return customerMock;
  }

  const response = await provider.customers.retrieve(customerId);

  logger.info({ customerId }, "STRIPE_CUSTOMER_FOUND");

  return response;
};

/**
 * @description https://stripe.com/docs/api/customers/create?lang=node
 * @param {*} param0
 * @param {*} dependencies
 * @returns
 */
const createCustomer = async (
  { name, email, phone, caller, description },
  { provider, config } = { provider: stripeProvider, config: defaultConfig }
) => {
  if (config.noInternet) {
    logger.info(customerMock, "STRIPE_MOCK_CUSTOMER_CREATED");
    return customerMock;
  }

  const response = await provider.customers.create({
    name,
    email,
    phone,
    description,
    metadata: {
      created_by_caller: caller,
    },
  });

  logger.info({ caller }, "STRIPE_CUSTOMER_CREATED");

  return response;
};

/**
 * @description https://stripe.com/docs/api/charges/create
 * @param {*} param0
 * @param {*} dependencies
 * @returns
 */
const chargeCustomer = async (
  { customerId, amount, currency = "USD", accountRef, caller, description },
  { provider, config } = { provider: stripeProvider, config: defaultConfig }
) => {
  if (config.noInternet) {
    logger.info(customerMock, "STRIPE_MOCK_CUSTOMER_CHARGED");

    return chargeMock;
  }

  const response = await provider.charges.create({
    customer: customerId,
    amount: amount * 100,
    currency,
    description,
    metadata: {
      last_charged_by_caller: caller,
      account_ref: accountRef,
    },
  });

  logger.info(
    { customerId, amount, currency, accountRef, caller, description },
    "STRIPE_CUSTOMER_CHARGED"
  );

  return response;
};

/**
 * @description https://stripe.com/docs/api/customers/update?lang=node
 * @param {*} param0
 * @param {*} dependencies
 * @returns
 */
const updateCustomer = async (
  { accountRef, customerId, name, email, phone, caller, description, source },
  { provider, config } = { provider: stripeProvider, config: defaultConfig }
) => {
  if (config.noInternet) {
    logger.info(customerMock, "STRIPE_MOCK_CUSTOMER_UPDATED");

    return customerMock;
  }

  const response = await provider.customers.update(customerId, {
    name,
    email,
    phone,
    description,
    source,
    metadata: {
      last_updated_by_caller: caller,
      account_ref: accountRef,
    },
  });

  logger.info({ customerId, cardId }, "STRIPE_CUSTOMER_UPDATED");

  return response;
};

/**
 * @description https://stripe.com/docs/api/cards/retrieve
 * @param {*} param0
 * @param {*} dependencies
 * @returns
 */
const getCard = async (
  { customerId, cardId },
  { provider, config } = { provider: stripeProvider, config: defaultConfig }
) => {
  try {
    if (config.noInternet) {
      logger.info({ card: cardMock }, "STRIPE_MOCK_PAYMENT_CARD_FOUND");
      return { card: cardMock };
    }

    const card = await provider.customers.retrieveSource(customerId, cardId);
    logger.info({ customerId, cardId }, "STRIPE_PAYMENT_CARD_FOUND");
    return { card };
  } catch (error) {
    return { error };
  }
};

module.exports = {
  getCustomer,
  createCustomer,
  updateCustomer,
  chargeCustomer,
  getCard,
};

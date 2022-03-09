const stripe = require("stripe");
const config = require("./config");

const stripeProvider = stripe(config.stripe.secretKey);

/**
 * @description https://stripe.com/docs/api/customers/retrieve?lang=node
 * @param {*} param0
 * @returns
 */
const getCustomer = ({ customerId }) =>
  stripeProvider.customers.retrieve(customerId);

/**
 * @description https://stripe.com/docs/api/customers/create?lang=node
 * @param {*} param0
 * @returns
 */
const createCustomer = ({ name, email, phone, caller, description }) =>
  stripeProvider.customers.create({
    name,
    email,
    phone,
    description,
    metadata: {
      created_by_caller: caller,
    },
  });

/**
 * @description https://stripe.com/docs/api/charges/create
 * @param {*} param0
 * @returns
 */
const chargeCustomer = ({
  customerId,
  amount,
  currency = "GBP",
  accountRef,
  caller,
  description,
}) =>
  stripeProvider.charges.create({
    customer: customerId,
    amount,
    currency,
    description,
    metadata: {
      last_charged_by_caller: caller,
      account_ref: accountRef,
    },
  });

/**
 * @description https://stripe.com/docs/api/customers/update?lang=node
 * @param {*} param0
 * @returns
 */
const updateCustomer = ({
  accountRef,
  customerId,
  name,
  email,
  phone,
  caller,
  description,
  source,
}) =>
  stripeProvider.customers.update(customerId, {
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

/**
 * @description https://stripe.com/docs/api/cards/retrieve
 * @param {*} param0
 * @returns
 */
const getCard = async ({ customerId, cardId }) => {
  try {
    const card = await stripeProvider.customers.retrieveSource(
      customerId,
      cardId
    );
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

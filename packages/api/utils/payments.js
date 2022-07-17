const config = require("./config");

/**
 * @description Calculates ad budget to run ads after taking away markup on ads
 * @param {*} param0
 * @returns
 */
const calculateAdBudgetMinusMarkup = ({ budget }) =>
  (parseInt(budget) / 100) * (100 - config.payments.advertPercentageMarkup);

/**
 * gets domain prices plus markup
 * @param {*} price
 * @returns
 */
const getDomainPriceWithMarkUp = (price) => {
  const {
    payments: { domainPercentageMarkUp },
  } = config;

  const markup = (price / 100) * domainPercentageMarkUp;

  return Math.ceil(price + markup);
};

/**
 * @description Calculates cost of domain
 * @param {*} param0
 * @returns
 */
const calculateDomainPrice = ({ domain, domainPrices }) => {
  const { price } = domainPrices.find(({ name }) => domain.includes(name));

  return price;
};

module.exports = {
  calculateAdBudgetMinusMarkup,
  getDomainPriceWithMarkUp,
  calculateDomainPrice,
};

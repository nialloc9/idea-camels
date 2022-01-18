const config = require("./config");

const getDomainPriceWithMarkUp = (price) => {
  const {
    price: {
      domain: { markup: toMarkup },
    },
  } = config;

  const markup = (price / 100) * toMarkup;

  return Math.ceil(price + markup);
};

module.exports = {
  getDomainPriceWithMarkUp,
};

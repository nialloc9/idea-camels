const { onGet: onGetAccount } = require("../data/account");
const { handleSuccess, logger } = require("../utils/utils");
const { updateCustomer, chargeCustomer } = require("../utils/stripe");

const onAddCard = ({
  data: {
    decodedToken: {
      data: { accountRef },
    },
    cardToken,
  },
  caller,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const { data } = await onGetAccount({ data: { accountRef }, caller });

      const { payment_customer_id } = data[0];

      await updateCustomer({
        customerId: payment_customer_id,
        accountRef,
        caller,
        source: cardToken,
      });

      resolve(handleSuccess("okay"));
    } catch (error) {
      reject(error);
    }
  });

const onChargeCustomer = ({
  data: {
    decodedToken: { accountRef },
    amount,
  },
  caller,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        data: [{ payment_customer_id }],
      } = await onGetAccount({ data: { accountRef }, caller });

      await chargeCustomer({
        customerId: payment_customer_id,
        accountRef,
        caller,
        amount,
      });

      resolve(handleSuccess("okay"));
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  onAddCard,
  onChargeCustomer,
};

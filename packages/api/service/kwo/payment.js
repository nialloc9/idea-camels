const { onGet: onGetAccount } = require("../../data/account");
const { handleSuccess } = require("../../utils/utils");
const { getConnection } = require("../../utils/database");
const { updateCustomer, chargeCustomer } = require("../../utils/stripe");

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
      const connection = await getConnection({
        caller,
        database: "kwo",
      });
      const { data } = await onGetAccount({
        data: { accountRef },
        caller,
        connection,
      });

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
      const connection = await getConnection({
        caller,
        database: "kwo",
      });

      const {
        data: [{ payment_customer_id }],
      } = await onGetAccount({ data: { accountRef }, caller, connection });

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

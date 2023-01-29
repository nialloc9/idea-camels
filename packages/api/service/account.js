const {
  onGet,
  onCreate: onCreateAccount,
  onUpdate: onUpdateAccount,
} = require("../data/account");
const { onCreate: onCreateToken } = require("../data/token");
const {
  createPasswordHash,
  validatePassword,
  scrubAccount,
  createJwToken,
} = require("../utils/security");
const { logger, handleSuccess } = require("../utils/utils");
const { now } = require("../utils/date");
const errors = require("../utils/errors");
const config = require("../utils/config");
const {
  getCustomer,
  createCustomer,
  getCard,
  updateCustomer,
} = require("../utils/stripe");
const { sendEmail } = require("../utils/mailer/mailer");
const { addCustomerToList } = require("../utils/marketingEmail");
const { resetPassword } = require("../utils/mailer/templates/resetPassword");
const { sendAlert } = require("../utils/alert");

const onLogin = ({ data: { email, password, rememberMe = false }, caller }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await onGet({ data: { email }, caller });

      const account = response.data[0];

      if (!account) {
        return reject(
          errors["1003"]({
            service: "FETCH_ACCOUNT",
            caller,
            reason: "Account not found",
            data: { email },
          })
        );
      }

      await validatePassword({
        password,
        hashedPassword: account.password,
        caller,
      });

      const timestamp = now();

      await onUpdateAccount({
        data: {
          accountRef: account.account_ref,
          lastUpdatedBy: account.account_ref,
          data: { lastLoggedin: timestamp, rememberMe },
        },
        caller,
      });

      const responseData = {
        account: scrubAccount({ ...account, last_logged_in: timestamp }, [
          "password",
        ]),
        token: createJwToken({
          data: { accountRef: account.account_ref },
          expiry: rememberMe
            ? config.security.extended_token_expiration
            : config.security.default_token_expiration,
        }),
      };

      const paymentProfile = await getCustomer({
        customerId: account.payment_customer_id,
      });

      if (paymentProfile.default_source) {
        const { card } = await getCard({
          customerId: account.payment_customer_id,
          cardId: paymentProfile.default_source,
        });

        responseData.card = card || {};
      }

      resolve(handleSuccess("account found", responseData));
    } catch (error) {
      reject(error);
    }
  });

/**
 * @description checks token to see if still valid, if so reissues a new token
 * @param {*} param0
 * @returns
 */
const onReauthorise = ({
  data: {
    decodedToken: {
      data: { accountRef },
    },
  },
  caller,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const { data } = await onGet({ data: { accountRef }, caller });

      const account = data[0];

      const responseData = {
        account: scrubAccount(account, ["password"]),
        token: createJwToken({
          data: { accountRef: account.account_ref },
          expiry: account.remember_me
            ? config.security.extended_token_expiration
            : config.security.default_token_expiration,
        }),
      };

      const paymentProfile = await getCustomer({
        customerId: account.payment_customer_id,
      });

      if (paymentProfile.default_source) {
        const { card } = await getCard({
          customerId: account.payment_customer_id,
          cardId: paymentProfile.default_source,
        });
        responseData.card = card || {};
      }

      resolve(handleSuccess("account reauthorised", responseData));
    } catch (error) {
      reject(error);
    }
  });

const onCreate = ({ data, caller }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { data: existing } = await onGet({
        data: { email: data.email },
        caller,
      });

      if (existing[0]) {
        return reject(
          errors["1000"]({
            service: "CREATE_ACCOUNT",
            caller,
            reason: "Email already in use",
            data: { email: data.email },
          })
        );
      }

      const { id: stripeCustomerId } = await createCustomer({
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        phone: data.phone,
        metadata: {
          created_by_caller: caller,
        },
      });

      const { data: account } = await onCreateAccount({
        data: {
          ...data,
          paymentCustomerId: stripeCustomerId,
          password: createPasswordHash({ password: data.password }),
        },
        caller,
      });

      const responeData = {
        account: scrubAccount(account, ["password"]),
        token: createJwToken({
          data: { accountRef: account.account_ref },
          expiry: account.remember_me
            ? config.security.extended_token_expiration
            : config.security.default_token_expiration,
        }),
      };

      try {
        const marketingCustomer = await addCustomerToList({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          tags: ["new_customer", "customer", "ideacamels"],
        });

        logger.info(
          { id: marketingCustomer.id, account_ref: account.account_ref },
          "CUSTOMER ADDED TO MARKETING LIST"
        );
      } catch (marketingEmailError) {
        logger.error(
          marketingEmailError,
          "ERROR ADDING CUSTOMER TO MARKETING LIST"
        );

        const { error: alertError } = await sendAlert({
          channel: "api-prod-alerts",
          text: JSON.stringify(marketingEmailError),
        });

        if (alertError) {
          logger.error(alertError, "ALERT ERROR");
        }
      }

      resolve(handleSuccess("account created", responeData));
    } catch (error) {
      reject(error);
    }
  });

const onUpdate = ({
  data: {
    updateData,
    decodedToken: {
      data: { accountRef },
    },
  },
  caller,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const dataToUpdate = { ...updateData };

      if (dataToUpdate.password) {
        dataToUpdate.password = createPasswordHash({
          password: dataToUpdate.password,
        });
      }

      const response = await onUpdateAccount({
        data: { accountRef, lastUpdatedBy: accountRef, data: dataToUpdate },
        caller,
      });

      const { data } = await onGet({ data: { accountRef }, caller });

      const { payment_customer_id } = data[0];

      await updateCustomer({
        customerId: payment_customer_id,
        accountRef,
        caller,
        phone: dataToUpdate.phone,
        email: dataToUpdate.email,
        name: `${dataToUpdate.firstName} ${dataToUpdate.lastName}`,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

const onForgottonPassword = ({ data: { email }, caller }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { data: userData } = await onGet({
        data: { email },
        caller,
      });

      if (!userData[0]) {
        return resolve(
          handleSuccess("email not found", {
            email,
          })
        );
      }

      const { account_ref: accountRef } = userData[0];

      const token = createJwToken({ data: { accountRef } });

      await onCreateToken({
        data: {
          token,
          type: "RESET_PASSWORD_EMAIL",
          email,
        },
        caller,
      });

      await sendEmail({
        to: email,
        from: config.company.support.email,
        subject: "IdeaCamels Reset Password",
        html: resetPassword({ token }),
      });

      resolve(
        handleSuccess(`email sent to ${email}`, {
          email,
        })
      );
    } catch (error) {
      reject(error);
    }
  });

const onDelete = ({
  data: {
    decodedToken: {
      data: { accountRef },
    },
    lastUpdatedBy,
  },
  caller,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const updatedData = {
        accountRef,
        deletedFlag: 1,
        lastUpdatedBy: lastUpdatedBy || accountRef,
      };
      const response = await onUpdateAccount({ data: updatedData, caller });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  onLogin,
  onReauthorise,
  onCreate,
  onUpdate,
  onForgottonPassword,
  onDelete,
};

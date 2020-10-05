const dbNames = {
  email: "email",
  firstName: "first_name",
  lastName: "last_name",
  password: "password",
  phone: "phone",
};

const mapAccountToDb = (account) =>
  Object.keys(account).reduce((total, curr) => {
    total[dbNames[curr]] = account[curr];

    return total;
  }, {});

const scrubAccount = ({ account_ref, password, ...rest } = {}) => ({ ...rest });

module.exports = { mapAccountToDb, scrubAccount };

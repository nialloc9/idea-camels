const dbNames = {
  email: "email",
  firstName: "first_name",
  lastName: "last_name",
  password: "password",
  phone: "phone",
  deletedFlag: "deleted_flag",
  lastUpdatedAt: "last_updated_at",
  lastUpdatedBy: "last_updated_by",
};

const mapper = (account) =>
  Object.keys(account).reduce((total, curr) => {
    if (dbNames[curr]) {
      total[dbNames[curr]] = account[curr];
    }

    return total;
  }, {});

module.exports = { mapper };

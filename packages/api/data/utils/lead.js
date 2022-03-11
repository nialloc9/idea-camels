const dbNames = {
  email: "email",
  leadRef: "lead_ref",
  experimentRef: "experiment_ref",
  createdAt: "created_at",
  deletedFlag: "deleted_flag",
  lastUpdatedAt: "last_updated_at",
};

const mapper = (account) =>
  Object.keys(account).reduce((total, curr) => {
    if (dbNames[curr]) {
      total[dbNames[curr]] = account[curr];
    }

    return total;
  }, {});

module.exports = { mapper };

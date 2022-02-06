const dbNames = {
  domainRef: "domain_ref",
  accountRef: "account_ref",
  budget: "budget",
  endDate: "end_date",
  themeRef: "theme_ref",
  templateRef: "template_ref",
  deletedFlag: "deleted_flag",
  lastUpdatedAt: "last_updated_at",
  lastUpdatedBy: "last_updated_by",
};

const mapper = (experiment) =>
  Object.keys(experiment).reduce((total, curr) => {
    if (dbNames[curr]) {
      total[dbNames[curr]] = experiment[curr];
    }

    return total;
  }, {});

module.exports = { mapper };

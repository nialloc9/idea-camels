const dbNames = {
    domainRef: "domain_ref",
    accountRef: "account_ref",
    name: "name",
    themeRef: "theme_ref",
    deletedFlag: 'deleted_flag',
    lastUpdatedAt: 'last_updated_at',
    lastUpdatedBy: 'last_updated_by'
  };
  
  const mapper = (experiment) =>
    Object.keys(experiment).reduce((total, curr) => {
  
      if(dbNames[curr]) {
        total[dbNames[curr]] = experiment[curr];
      }
  
      return total;
    }, {});
  
  module.exports = { mapper };

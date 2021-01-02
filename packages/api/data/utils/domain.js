const dbNames = {
    domainRef: "domain_ref",
    accountRef: "account_ref",
    name: "name",
    deletedFlag: 'deleted_flag',
    lastUpdatedAt: 'last_updated_at',
    lastUpdatedBy: 'last_updated_by',
    createdBy: 'created_by',
  };
  
  const mapper = (domain) =>
    Object.keys(domain).reduce((total, curr) => {
  
      if(dbNames[curr]) {
        total[dbNames[curr]] = domain[curr];
      }
  
      return total;
    }, {});

  module.exports = { mapper };
  
const dbNames = {
    domainRef: "domain_ref",
    accountRef: "account_ref",
    name: "name",
    templateRef: "template_ref",
    content: "content",
    expiry: "expiry",
    content: "content",
    deletedFlag: 'deleted_flag',
    lastUpdatedAt: 'last_updated_at',
    lastUpdatedBy: 'last_updated_by'
  };
  
  const mapExperimentToDb = (domain) =>
    Object.keys(domain).reduce((total, curr) => {
  
      if(dbNames[curr]) {
        total[dbNames[curr]] = account[curr];
      }
  
      return total;
    }, {});
  
  module.exports = { mapExperimentToDb };

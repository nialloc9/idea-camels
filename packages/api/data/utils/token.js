const dbNames = {
    email: "email",
    type: "type",
    expires: "expires",
    token: "token",
    createdBy: "created_by",
    createdAt: "created_at",
    deletedFlag: 'deleted_flag',
    lastUpdatedAt: 'last_updated_at',
    lastUpdatedBy: 'last_updated_by'
  };
  
  const mapper = (account) =>
    Object.keys(account).reduce((total, curr) => {
  
      if(dbNames[curr]) {
        total[dbNames[curr]] = account[curr];
      }
  
      return total;
    }, {});
  
  module.exports = { mapper };
  
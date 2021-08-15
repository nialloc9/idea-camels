const dbNames = {
    themeRef: "theme_ref",
    name: "name",
    content: "content",
    theme: 'theme',
    lastUpdatedAt: 'last_updated_at',
    lastUpdatedBy: 'last_updated_by',
    createdBy: 'created_by',
    deletedFlag: 'deleted_flag'
  };

  const mapper = (theme) =>
    Object.keys(theme).reduce((total, curr) => {
  
      if(dbNames[curr]) {
        total[dbNames[curr]] = theme[curr];
      }
  
      return total;
    }, {});

  module.exports = { mapper };

module.exports = {
  headers: {
    Authorisation:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50UmVmIjoxfQ.pYjA1uxGQ_ovMl-qvPWif1SqnXmI6W3lCY2D7AqxcUw",
  },
  body: JSON.stringify({
    contact: {
      /* required */ addressLine1: "STRING_VALUE",
      addressLine2: "STRING_VALUE",
      city: "STRING_VALUE",
      contactType: "AD",
      email: "STRING_VALUE",
      extraParams: [],
      fax: "STRING_VALUE",
      firstName: "STRING_VALUE",
      lastName: "STRING_VALUE",
      organizationName: "STRING_VALUE",
      phoneNumber: "STRING_VALUE",
      state: "STRING_VALUE",
      zipCode: "STRING_VALUE",
    },
    domainName: "STRING_VALUE" /* required */,
    durationInYears: "NUMBER_VALUE" /* required */,
    autoRenew: false,
  }),
};

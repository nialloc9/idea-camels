const mapContact = ({
  contact: {
    addressLine1,
    addressLine2,
    city,
    contactType,
    countryCode,
    email,
    fax,
    firstName,
    lastName,
    organizationName,
    phoneNumber,
    state,
    zipCode,
  },
  domainName,
  durationInYears,
  autoRenew,
}) => ({
  contact: {
    AddressLine1: addressLine1,
    AddressLine2: addressLine2,
    City: city,
    ContactType: contactType,
    CountryCode: countryCode,
    Email: email,
    Fax: fax,
    FirstName: firstName,
    LastName: lastName,
    OrganizationName: organizationName,
    PhoneNumber: phoneNumber,
    State: state,
    ZipCode: zipCode,
  },
  domainName,
  durationInYears,
  autoRenew,
});

module.exports = {
  mapContact,
};

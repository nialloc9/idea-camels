const AWS = requir('aws-sdk')

/**
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53Domains.html#checkDomainAvailability-property
 */
module.exports.validateDomain = ({ domain }, provider = new AWS.Route53Domains()) =>
  new Promise((resolve) => {
    provider.checkDomainAvailability({ DomainName: domain }, (err, data) => resolve({data, error: err}));
  });

/**
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53Domains.html#getDomainSuggestions-property
 */
module.exports.fetchDomainSuggestions = async ({ domain, count }, provider = new AWS.Route53Domains()) =>
  new Promise((resolve) => {
    provider.checkDomainAvailability(
      { DomainName: domain, OnlyAvailable: true, SuggestionCount: count },
      (err, data) => resolve({ error: err, data })
    );
  });

/**
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53Domains.html#registerDomain-property
 */
module.exports.registerDomain = async (
  { contact, domain, durationInYears = 1, autoRenew = false },
  provider = new AWS.Route53Domains()
) =>
  new Promise((resolve) => {
    provider.registerDomain(
      {
        AdminContact: contact,
        DomainName: domain,
        DurationInYears: durationInYears,
        RegistrantContact: contact,
        TechContact: contact,
        AutoRenew: autoRenew,
      },
      (err, data) => resolve({ error: err, data })
    );
  });

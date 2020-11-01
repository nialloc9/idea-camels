/**
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53Domains.html#checkDomainAvailability-property
 */
module.exports.validateDomain = (provider, { domain }) =>
  new Promise((resolve, reject) => {
    provider.checkDomainAvailability({ DomainName: domain }, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });

/**
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53Domains.html#getDomainSuggestions-property
 */
module.exports.fetchDomainSuggestions = async (provider, { domain, count }) =>
  new Promise((resolve, reject) => {
    provider.checkDomainAvailability(
      { DomainName: domain, OnlyAvailable: true, SuggestionCount: count },
      (err, data) => {
        if (err) {
          return reject(err);
        }

        return resolve(data);
      }
    );
  });

/**
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53Domains.html#registerDomain-property
 */
module.exports.registerDomain = async (
  provider,
  { contact, domain, durationInYears = 1, autoRenew = false }
) =>
  new Promise((resolve, reject) => {
    provider.registerDomain(
      {
        AdminContact: contact,
        DomainName: domain,
        DurationInYears: durationInYears,
        RegistrantContact: contact,
        TechContact: contact,
        AutoRenew: autoRenew,
      },
      (err, data) => {
        if (err) {
          return reject(err);
        }

        return resolve(data);
      }
    );
  });

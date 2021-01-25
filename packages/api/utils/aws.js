const AWS = require('aws-sdk')
const fs = require('fs')
const config = require('./config')
const { logger } = require('./utils')

const defaultRoute53Provider = new AWS.Route53Domains({ region: 'us-east-1' }) // Needs to be explicitly us-east-1 as RDS is global
const defaultECSProvider = new AWS.ECS({ region: config.aws.region })
const defaultS3Provider = new AWS.S3({ region: config.aws.region }) // Needs to be explicitly us-east-1 as RDS is global

 /**
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/ECS.html#runTask-property
 */
const runTask = ({ cluster, taskDefinition, environmentVariables }, 
  newProvider
  ) =>
  new Promise((resolve) => {

    if(!config.isProd || config.noInternet) {
      logger.warn({ domain }, "Env is not prod or there is no internet")
      return resolve({ error: undefined, data: {} })
    }
    const provider = newProvider || defaultECSProvider

    provider.runTask({ cluster, taskDefinition, overrides: { containerOverrides: [{ environment: environmentVariables }] } }, (err, data) => resolve({data, error: err}));
  });

/**
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53Domains.html#checkDomainAvailability-property
 */
const validateDomain = ({ domain }, 
  newProvider
  ) =>
  new Promise((resolve) => {

    if(!config.isProd || config.noInternet) {
      logger.warn({ domain }, "Env is not prod or there is no internet")
      return resolve({ error: undefined, data: {} })
    }
    const provider = newProvider || defaultRoute53Provider

    provider.checkDomainAvailability({ DomainName: domain }, (err, data) => resolve({data, error: err}));
  });

/**
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53Domains.html#getDomainSuggestions-property
 */
const fetchDomainSuggestions = async ({ domain, count }, 
  newProvider
  ) =>
  new Promise((resolve) => {

    if(!config.isProd || config.noInternet) {
      logger.warn({ domain, count }, "Env is not prod or there is no internet")
      return resolve({ error: undefined, data: {} })
    }

    const provider = newProvider || defaultRoute53Provider

    provider.checkDomainAvailability(
      { DomainName: domain, OnlyAvailable: true, SuggestionCount: count },
      (err, data) => resolve({ error: err, data })
    );
  });

  const defaultContact = {
    AddressLine1: config.company.addressLine1,
    AddressLine2: config.company.addressLine2,
    City: config.company.city,
    ContactType: "COMPANY",
    CountryCode: config.company.countryCode,
    Email: config.company.email,
    ExtraParams: [],
    FirstName: config.company.contact.firstName,
    LastName: config.company.contact.lastName,
    OrganizationName: config.company.name,
    ZipCode: config.company.postCode,
    PhoneNumber: config.company.phone
  }
/**
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53Domains.html#registerDomain-property
 */
const registerDomain = async (
  { contact = defaultContact, domain, durationInYears = 1, autoRenew = false },
  newProvider
) =>
  new Promise((resolve) => {
    if(!config.isProd || config.noInternet) {
      logger.warn({ contact, domain, durationInYears, autoRenew }, "Env is not prod or there is no internet")
      return resolve({ error: undefined, data: {} })
    }

    const provider = newProvider || defaultRoute53Provider

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

const uploadToS3 = async ({
  file: FileToUpload,
  bucket: Bucket,
  key: Key,
  acl: ACL = "public-read",
  caller
}, newProvider) =>
  new Promise((resolve, reject) => {

    if(config.noInternet) {
      logger.warn({ contact, domain, durationInYears, autoRenew }, "There is no internet")
      return resolve({ error: undefined, data: {} })
    }

    const provider = newProvider || defaultS3Provider

      if (noInternet) {
          return resolve(
              handleSuccess(
                  `SERVICE_UPLOAD - FROM ${caller} - file uploaded`,
                  {}
              )
          );
      }

      fs.readFile(FileToUpload, (error, data) => {
          if (error) {
              return reject(
                  errors["3004"]({
                      service: "SERVICE_UPLOAD",
                      caller,
                      reason: error.message,
                      data: { file: FileToUpload }
                  })
              );
          }

          // convert file to base64
          var base64data = new Buffer(data, "binary");

          provider.putObject(
              {
                  Bucket,
                  Key,
                  Body: base64data,
                  ACL
              },
              error => {
                  if (error) {
                      return reject(
                          errors["3006"]({
                              service: "SERVICE_UPLOAD",
                              caller,
                              reason: error.message || error.code,
                              data: { Key }
                          })
                      );
                  }

                  resolve(
                      handleSuccess(
                          `SERVICE_UPLOAD - FROM ${caller} - file uploaded`,
                          {}
                      )
                  );
              }
          );
      });
  });

module.exports = {
  runTask,
  validateDomain,
  fetchDomainSuggestions, 
  registerDomain,
  uploadToS3
}
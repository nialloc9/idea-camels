const AWS = require("aws-sdk");
const fs = require("fs");
const config = require("./config");
const errors = require("./errors");
const { logger, handleSuccess } = require("./utils");

const defaultRoute53Provider = new AWS.Route53Domains({ region: "us-east-1" }); // Needs to be explicitly us-east-1 as RDS is global
const defaultECSProvider = new AWS.ECS({ region: config.aws.region });
const defaultS3Provider = new AWS.S3({
  region: config.aws.region,
  signatureVersion: "v4",
}); // Needs to be explicitly us-east-1 as RDS is global

/**
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/ECS.html#runTask-property
 */
const runTask = (
  { cluster, taskDefinition, environmentVariables },
  newProvider
) =>
  new Promise((resolve) => {
    // if (!config.isProd || config.noInternet) {
    //   logger.warn({ environmentVariables }, "Env is not prod or there is no internet");
    //   return resolve({ error: undefined, data: {} });
    // }
    const provider = newProvider || defaultECSProvider;

    provider.runTask(
      {
        cluster,
        taskDefinition,
        launchType: "FARGATE",
        networkConfiguration: {
          awsvpcConfiguration: {
            assignPublicIp: "ENABLED",
            subnets: [
              "subnet-04e887a31667eed1d",
              "subnet-0839da8b9ce40d74d",
              "subnet-0a8dd93b64b17b982",
            ],
          },
        },
        overrides: {
          containerOverrides: [
            { name: "builder-prod", environment: environmentVariables },
          ],
        },
      },
      (err, data) => resolve({ data, error: err })
    );
  });

/**
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53Domains.html#checkDomainAvailability-property
 */
const validateDomain = ({ domain, caller }, newProvider) =>
  new Promise((resolve, reject) => {
    // if(!config.isProd || config.noInternet) {
    //   logger.warn({ domain }, "Env is not prod or there is no internet")
    //   return resolve({ error: undefined, data: {} })
    // }
    const provider = newProvider || defaultRoute53Provider;

    provider.checkDomainAvailability({ DomainName: domain }, (err, data) => {
      if (err) return reject(err);

      const response = {
        isAvailable: data["Availability"] === "AVAILABLE",
        domain,
      };

      resolve({ data: response });
    });
  });

/**
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53Domains.html#getDomainSuggestions-property
 */
const suggestDomain = (
  { domain, onlyAvailable = true, count = 5 },
  newProvider
) =>
  new Promise((resolve, reject) => {
    if (config.noInternet) {
      logger.warn({ domain }, "No Internet set in config");
      return resolve({ error: undefined, data: {} });
    }
    const provider = newProvider || defaultRoute53Provider;

    provider.getDomainSuggestions(
      {
        DomainName: domain,
        OnlyAvailable: onlyAvailable,
        SuggestionCount: count,
      },
      (err, data) => {
        if (err) return reject({ data, error: err });

        resolve({ data: data.SuggestionsList, error: err });
      }
    );
  });

/**
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53Domains.html#listPrices-property
 */
const listDomainPrices = ({}, newProvider) =>
  new Promise((resolve, reject) => {
    if (config.noInternet) {
      logger.warn({}, "No Internet set in config");
      return resolve({ error: undefined, data: {} });
    }
    const provider = newProvider || defaultRoute53Provider;

    provider.listPrices({}, (err, data) => {
      if (err) return reject({ data, error: err });

      resolve({ data: data.Prices, error: err });
    });
  });

/**
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53Domains.html#getDomainSuggestions-property
 */
const fetchDomainSuggestions = async ({ domain, count }, newProvider) =>
  new Promise((resolve) => {
    if (!config.isProd || config.noInternet) {
      logger.warn({ domain, count }, "Env is not prod or there is no internet");
      return resolve({ error: undefined, data: {} });
    }

    const provider = newProvider || defaultRoute53Provider;

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
  PhoneNumber: config.company.phone,
};
/**
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53Domains.html#registerDomain-property
 */
const registerDomain = async (
  { contact = defaultContact, domain, durationInYears = 1, autoRenew = false },
  newProvider
) =>
  new Promise((resolve) => {
    if (!config.isProd || config.noInternet) {
      logger.warn(
        { contact, domain, durationInYears, autoRenew },
        "Env is not prod or there is no internet"
      );
      return resolve({ error: undefined, data: {} });
    }

    const provider = newProvider || defaultRoute53Provider;

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

// Now lets export this function so we can call it from somewhere else
const getS3SignedUrl = (
  { bucket, name, type, expires = 300, caller },
  newProvider
) =>
  new Promise((resolve, reject) => {
    // Set up the payload of what we are sending to the S3 api
    const params = {
      Bucket: bucket,
      Key: name,
      Expires: expires,
      ACL: "public-read",
      ContentType: type,
    };

    if (config.noInternet) {
      logger.warn(params, "There is no internet");
      return resolve(
        handleSuccess(`SERVICE_UPLOAD - FROM ${caller} - file uploaded`, {})
      );
    }

    const provider = newProvider || defaultS3Provider;

    provider.getSignedUrl("putObject", params, (error, data) => {
      if (error) {
        return reject(
          errors["3003"]({
            service: "SERVICE_UPLOAD",
            caller,
            reason: error.message || error.code,
            data: { Key, Bucket },
          })
        );
      }

      resolve(
        handleSuccess(
          `SERVICE_GET_PRESIGNED_URL - FROM ${caller} - url signed`,
          {
            signedUrl: data,
            url: `https://${bucket}.s3.amazonaws.com/${name}`,
          }
        )
      );
    });
  });

/**
 *
 * https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html
 */
const uploadToS3 = async (
  { path, bucket: Bucket, key: Key, acl: ACL = "public-read", caller },
  newProvider
) =>
  new Promise((resolve, reject) => {
    if (config.noInternet) {
      logger.warn(
        { path, bucket: Bucket, key: Key, acl: (ACL = "public-read") },
        "There is no internet"
      );
      return resolve(
        handleSuccess(`SERVICE_UPLOAD - FROM ${caller} - file uploaded`, {})
      );
    }

    const provider = newProvider || defaultS3Provider;

    fs.readFile(path, (error, data) => {
      if (error) {
        return reject(
          errors["3001"]({
            service: "SERVICE_UPLOAD",
            caller,
            reason: error.message,
            data: { path },
          })
        );
      }

      provider.putObject(
        {
          Bucket,
          Key,
          Body: data.toString(),
          ACL,
        },
        (error) => {
          if (error) {
            console.log(2, error);
            return reject(
              errors["3002"]({
                service: "SERVICE_UPLOAD",
                caller,
                reason: error.message || error.code,
                data: { Key, Bucket },
              })
            );
          }

          resolve({
            bucket: Bucket,
            key: Key,
          });
        }
      );
    });
  });
module.exports = {
  runTask,
  validateDomain,
  suggestDomain,
  fetchDomainSuggestions,
  registerDomain,
  listDomainPrices,
  getS3SignedUrl,
  uploadToS3,
};

const AWS = require('aws-sdk')
const config = require('./config')
const { logger } = require('./utils')

const defaultRoute53Provider = new AWS.Route53Domains({ region: 'us-east-1' }) // Needs to be explicitly us-east-1 as RDS is global
const defaultECSProvider = new AWS.ECS({ region: config.aws.region }) // Needs to be explicitly us-east-1 as RDS is global

var params = {
  cluster: "default", 
  taskDefinition: "sleep360:1"
 };
 ecs.runTask(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
   /*
   data = {
    tasks: [
       {
      containerInstanceArn: "arn:aws:ecs:us-east-1:<aws_account_id>:container-instance/ffe3d344-77e2-476c-a4d0-bf560ad50acb", 
      containers: [
         {
        name: "sleep", 
        containerArn: "arn:aws:ecs:us-east-1:<aws_account_id>:container/58591c8e-be29-4ddf-95aa-ee459d4c59fd", 
        lastStatus: "PENDING", 
        taskArn: "arn:aws:ecs:us-east-1:<aws_account_id>:task/a9f21ea7-c9f5-44b1-b8e6-b31f50ed33c0"
       }
      ], 
      desiredStatus: "RUNNING", 
      lastStatus: "PENDING", 
      overrides: {
       containerOverrides: [
          {
         name: "sleep"
        }
       ]
      }, 
      taskArn: "arn:aws:ecs:us-east-1:<aws_account_id>:task/a9f21ea7-c9f5-44b1-b8e6-b31f50ed33c0", 
      taskDefinitionArn: "arn:aws:ecs:us-east-1:<aws_account_id>:task-definition/sleep360:1"
     }
    ]
   }
   */
 });

 /**
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/ECS.html#runTask-property
 */
module.exports.runTask = ({ cluster, taskDefinition, environmentVariables }, 
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
module.exports.validateDomain = ({ domain }, 
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
module.exports.fetchDomainSuggestions = async ({ domain, count }, 
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
module.exports.registerDomain = async (
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

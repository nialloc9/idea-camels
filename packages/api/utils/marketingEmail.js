const mailchimp = require("@mailchimp/mailchimp_marketing");
const config = require('./config');

/**
 * @description add customer to mailing list
 * @param {*} param0 
 * @returns 
 */
const addCustomerToList = async ({ email, firstName, lastName, listId = config.mailChimp.list.default } = {}) => {

  mailchimp.setConfig({
    apiKey: config.mailChimp.apiKey,
    server: "us17",
  }); 

  return await mailchimp.lists.addListMember(listId, {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName
    }
  });
}


  module.exports = {
      addCustomerToList
  }
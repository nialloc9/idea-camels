const mailchimp = require("@mailchimp/mailchimp_marketing");
const config = require("./config");

// API DOCS: https://mailchimp.com/developer/marketing/api/landing-pages/

/**
 * @description add customer to mailing list
 * @param {*} param0
 * @returns
 */
const addCustomerToList = async ({
  email,
  firstName,
  lastName,
  phone,
  listId = config.mailChimp.list.default,
  tags,
} = {}) => {
  mailchimp.setConfig({
    apiKey: config.mailChimp.apiKey,
    server: "us17",
  });

  return await mailchimp.lists.addListMember(listId, {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,
      PHONE: phone,
    },
    tags,
  });
};

/**
 * @description updates user tags
 * @param {*} param0
 * @returns
 */
const updateCustomerTags = async ({
  listId,
  customerMarketingEmailId,
  tags,
}) => {
  mailchimp.setConfig({
    apiKey: config.mailChimp.apiKey,
    server: "us17",
  });

  return await mailchimp.lists.updateListMemberTags(
    listId,
    customerMarketingEmailId,
    {
      tags,
    }
  );
};

module.exports = {
  addCustomerToList,
  updateCustomerTags,
};

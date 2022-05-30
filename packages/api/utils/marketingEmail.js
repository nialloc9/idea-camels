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
    },
    tags,
  });
};

/**
 * @description selects an experiment at random to run for a campaign
 * @param {*} experimentId
 * @returns
 */
const selectRandomExperiment = (experimentId) => {
  const experiment = config.mailChimp.experiment[experimentId];

  return experiment[Math.floor(Math.random() * experiment.length)];
};

/**
 * @description sends marketing email
 * @param {*} param0
 * @returns
 */
const sendMarketingEmail = async ({
  segmentId,
  previewText,
  listId,
  subjectLine,
  campaignTitle,
  templateId,
  fromName = "Amy",
  replyTo = "support@ideacamels.com",
}) => {
  mailchimp.setConfig({
    apiKey: config.mailChimp.apiKey,
    server: "us17",
  });
  const campaign = await mailchimp.campaigns.create({
    type: "regular",
    recipients: {
      segment_opts: {
        saved_segment_id: segmentId,
      },
      list_id: listId,
    },
    settings: {
      subject_line: subjectLine,
      preview_text: previewText,
      title: campaignTitle,
      template_id: templateId,
      from_name: fromName,
      reply_to: replyTo,
      to_name: "*|FNAME|*",
    },
  });

  await mailchimp.campaigns.send(campaign.id);

  return campaign;
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
  selectRandomExperiment,
  addCustomerToList,
  sendMarketingEmail,
  updateCustomerTags,
};

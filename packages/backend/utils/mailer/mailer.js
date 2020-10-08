const nodemailer = require("nodemailer");
const ses = require("nodemailer-ses-transport");
const errors = require("../errors");
const { handleSuccess, logger } = require("../utils");
const config = require("../config");

const {
  noInternet,
  aws: { accessKeyId, secretAccessKey, region },
} = config;

// create transport layer
const transporter = nodemailer.createTransport(
  ses({ accessKeyId, secretAccessKey, region })
);

/**
 * sends an email to the specified email
 * @param subject
 * @param from
 * @param to
 * @param text
 * @param html
 * @private
 */
const mailer = ({ subject, from, to, text, html }) =>
  new Promise((resolve, reject) => {
    const mailOptions = {
      from, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    };

    if (noInternet) {
      logger.warn("warn", "========= SIMULATION - send email =========");
      return resolve(handleSuccess(`Message sent`, {}));
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(errors["2004"]({ data: { to }, reason: error.message }));
      }

      resolve(handleSuccess(`Message sent ${info.messageId}: ${info}`, {}));
    });
  });

module.exports = {
  mailer,
};

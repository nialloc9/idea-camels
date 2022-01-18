const nodemailer = require("nodemailer");
const ses = require("nodemailer-ses-transport");
const errors = require("../errors");
const config = require("../config");
const { logger, handleSuccess } = require("../utils");

const {
  noInternet,
  aws: { region },
} = config;

// create transport layer
const transporter = nodemailer.createTransport(ses({ region }));

/**
 * sends an email to the specified email
 * @param subject
 * @param from
 * @param to
 * @param text
 * @param html
 * @private
 */
const sendEmail = ({ subject, from, to, text, html, caller }) =>
  new Promise((resolve, reject) => {
    const mailOptions = {
      from, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    };

    if (noInternet) {
      logger.warn({}, "========= SIMULATION - send email =========");
      return resolve(
        handleSuccess(`UTILS - SEND_EMAIL - FROM ${caller}`, {
          from,
          to,
          subject,
          text,
          html,
        })
      );
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return reject(
          errors["3005"]({ data: { to }, reason: error.message, caller })
        );
      }

      resolve(
        handleSuccess(`UTILS - SEND_EMAIL - FROM ${caller}`, {
          from,
          to,
          subject,
        })
      );
    });
  });

module.exports = {
  sendEmail,
};

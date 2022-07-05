const config = require("../../config");

const {
  webAddress,
  company: {
    tagLine,
    support: { email, name },
  },
} = config;

const resetPassword = ({
  token,
  webAdd = webAddress,
  t = tagLine,
  e = email,
  n = name,
}) => {
  const link = `${webAdd}/password-reset?token=${encodeURIComponent(token)}`;

  return `
        <div>
            <p>Hello</p>
               
            <p>
                Please reset your account password by clicking the link below:
                <a href="${link}">${link}</a>
            </p>
                                        
            <p>
                If you did not request this email please email <a href='mailto:${e}'>${e}</a>.
            </p>
                                        
            <p>
                ${t}
            </p>
            <p>
                ${n}
            </p>
        </div>
        `;
};

module.exports = {
  resetPassword,
};

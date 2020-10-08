const config = require("../utils/config");

const { webAddress, supportEmail } = config;

const resetEmail = (token) => {
  return `
        <div>
            <p>Hello</p>
               
            <p>
                Please reset your account password by clicking the link below:
                <a href="${webAddress}/token/password-reset/${encodeURIComponent(
    token
  )}">${webAddress}/token/password-reset/${token}</a>
            </p>
                                        
            <p>
                If you did not request this email please email <a href='mailto:${supportEmail}'>${supportEmail}</a>.
            </p>
                                        
            <p>
                Kind Regards
            </p>
            <p>
                Idea Camels
            </p>
        </div>
        `;
};

module.exports = {
  resetEmail,
};

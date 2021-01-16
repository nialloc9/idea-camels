const config = require('../../config');

const {webAddress, company: { tagLine, support: { email, name } }} = config;

const resetPassword = token => {

    const encodedToken = encodeURIComponent (token);

    const link = `${webAddress}/token/password-reset/${encodeURIComponent (token)}`;

  return `
        <div>
            <p>Hello</p>
               
            <p>
                Please reset your account password by clicking the link below:
                <a href="${link}">${link}</a>
            </p>
                                        
            <p>
                If you did not request this email please email <a href='mailto:${email}'>${email}</a>.
            </p>
                                        
            <p>
                ${tagLine}
            </p>
            <p>
                ${name}
            </p>
        </div>
        `;
};

module.exports = {
    resetPassword
}
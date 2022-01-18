const config = require("../../config");

const {
  webAddress,
  company: {
    tagLine,
    support: { email, name: supportName },
  },
} = config;

const signUp = ({ name, token }) => {
  const encodedToken = encodeURIComponent(token);

  const link = `${webAddress}/account/activate/${encodedToken}`;

  return `
          <div>
              <p>Hello ${name}</p>
                 
              <p>
                  Please activate your account by clicking below
                  <a href="${link}">${link}</a>
              </p>
                                          
              <p>
                  ${tagLine}
              </p>
              <p>
                  ${supportName}
              </p>
          </div>
          `;
};

module.exports = {
  signUp,
};

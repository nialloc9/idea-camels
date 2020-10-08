const config = require("../utils/config");

const { supportEmail } = config;

const invoice = ({ amount, pdf }) => {
  return `
        <div>
            <p>Hello</p>
               
            <p>
                You have been successfully billed: ${amount}
            </p>
                                        
            <p>
                If you did not request this email please email ${supportEmail}.
            </p>
                                        
            <p>
                You can find a copy of your invoice <a href='${pdf}'>here</a>.
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
  invoice,
};

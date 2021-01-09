const errors = {
    1000: "Email already in use.",
    1001: "Domain is not owned by this account.",
    1002: "Account not found.",
    1003: "Invalid email/password combination.",
    1004: "Authhorisation error. Please reload your browser",
    1005: "Domain not available.",
    1006: "Failed to register domain. Please try again."
  };
  
const defaultError = ({ code }) => `An error has occured. Please reload your browser. Code: ${code}.`;

export const getError = ({ code }) => errors[code] || defaultError({ code });  
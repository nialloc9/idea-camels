import { logger } from "../utils/utils";

const errors = {
  1000: "Email already in use.",
  1001: "Domain is not owned by this account.",
  1002: "Account not found.",
  1003: "Invalid email/password combination.",
  1004: "Authhorisation error. Please reload your browser",
  1005: "Domain not available.",
  1006: "Failed to register domain. Please try again.",
};

const defaultError = ({ code = 500 }) =>
  `An error has occured. Please reload your browser. Code: ${code}.`;

export const getError = (error) => {
  logger.error("API_ERROR", error);
  const { code } = error;
  return errors[code] || defaultError({ code });
};

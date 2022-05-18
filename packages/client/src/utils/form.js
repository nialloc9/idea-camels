import {
  validatePhoneNumber,
  validateRequired,
  validateMaxLength,
  validateNumber,
  validateMinValue,
  validateMaxValue,
  validateEmail,
  validateRequiredCountry,
  validateRequiredNumber,
  validateRequiredName,
  validateRequiredLastName,
  validateRequiredAddress,
  validateRequiredPostCode,
  validateAcceptedTerms,
  validateRequiredEmail,
  validateRequiredPassword,
  validateRequiredPasswordConfirmation,
  validateRequiredDay,
  validateRequiredTime,
  validateTelephoneNumber,
  validateMinLength,
  validateRequiredMessage,
  validateDomain,
  pipeline,
  pipelineHof,
} from "@nialloc9/vcheck";
import { FORM_ERROR } from "final-form";

/**
 * @description validates whether string has special characters
 */
const validateSpecialChars = (value) =>
  value && /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value)
    ? "Special characters not allowed"
    : undefined;

export {
  validatePhoneNumber,
  validateRequired,
  validateMaxLength,
  validateNumber,
  validateMinValue,
  validateMaxValue,
  validateEmail,
  validateRequiredCountry,
  validateRequiredNumber,
  validateRequiredName,
  validateRequiredLastName,
  validateRequiredAddress,
  validateRequiredPostCode,
  validateAcceptedTerms,
  validateRequiredEmail,
  validateRequiredPassword,
  validateRequiredPasswordConfirmation,
  validateRequiredDay,
  validateRequiredTime,
  validateTelephoneNumber,
  validateMinLength,
  validateRequiredMessage,
  validateDomain,
  validateSpecialChars,
  pipeline,
  pipelineHof,
  FORM_ERROR,
};

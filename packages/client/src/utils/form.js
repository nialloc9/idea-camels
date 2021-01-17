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
        validateRequiredMessage
    } from "@nialloc9/vcheck";
    import { pipeline } from "@nialloc9/vcheck/lib/validation"
    

    const composeValidators = validators => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

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
    pipeline,
    composeValidators
}
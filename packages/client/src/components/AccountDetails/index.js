import React from "react";
import { Grid, GridRow, GridColumn } from "../Grid";
import { Button } from "../Styled/Button";
import { Form } from "../Form/Form";
import { FormInput } from "../Form/Input";
import { withForm } from "../../hoc/withForm";
import {
  validateRequiredName,
  validateRequiredLastName,
  validateRequiredEmail,
  validateEmail,
  validateRequired,
  validateMaxLength,
  validateRequiredPassword,
  validateRequiredPasswordConfirmation,
  validatePhoneNumber,
} from "../../utils/form";
import { validateMinLength } from "@nialloc9/vcheck/lib/validation";

export default withForm(
  ({
    onSubmit,
    isCompactError,
    isCompactSuccess,
    successMessage,
    submitError,
    submitting,
    pristine,
    passwordRequired = true,
    shouldShowFirstName = true,
    shouldShowLastName = true,
    shouldShowEmail = true,
    shouldShowPhone = true,
    buttonText = "Sign Up",
    formName = "sign-up",
  }) => (
    <Form
      isCompactError={isCompactError}
      isCompactSuccess={isCompactSuccess}
      error={submitError}
      success={successMessage}
      onSubmit={onSubmit}
    >
      <Grid container centered stackable>
        <GridRow centered columns={2}>
          {shouldShowFirstName && (
            <GridColumn>
              <FormInput
                labelText="First Name"
                name="firstName"
                defaultValue=""
                validate={[validateRequiredName]}
                action={`${formName}-account-details-form-click`}
                label="first-name"
              />
            </GridColumn>
          )}
          {shouldShowLastName && (
            <GridColumn>
              <FormInput
                labelText="Last Name"
                name="lastName"
                defaultValue=""
                validate={[validateRequiredLastName, validateMaxLength(20)]}
                action={`${formName}-account-details-form-click`}
                label="last-name"
              />
            </GridColumn>
          )}
        </GridRow>
        <GridRow centered columns={2}>
          {shouldShowEmail && (
            <GridColumn>
              <FormInput
                labelText="Email"
                type="email"
                name="email"
                defaultValue=""
                validate={[
                  validateRequiredEmail,
                  validateEmail,
                  validateMaxLength(100),
                ]}
                action={`${formName}-account-details-form-click`}
                label="email"
              />
            </GridColumn>
          )}
          {shouldShowPhone && (
            <GridColumn>
              <FormInput
                info="Please use format 07564833375 or +447564833375"
                labelText="Phone"
                name="phone"
                type="phone"
                defaultValue=""
                validate={[validateRequired, validatePhoneNumber]}
                action={`${formName}-account-details-form-click`}
                label="phone"
              />
            </GridColumn>
          )}
        </GridRow>
        <GridRow centered columns={2}>
          <GridColumn>
            <FormInput
              labelText="Password"
              name="password"
              type="password"
              defaultValue=""
              validate={
                passwordRequired
                  ? [validateRequiredPassword, validateMinLength(8)]
                  : [validateMinLength(8)]
              }
              action={`${formName}-account-details-form-click`}
              label="password"
            />
          </GridColumn>
          <GridColumn>
            <FormInput
              labelText="Confirm Password"
              name="confirmPassword"
              type="password"
              defaultValue=""
              validate={
                passwordRequired
                  ? [validateRequiredPasswordConfirmation, validateMinLength(8)]
                  : [validateMinLength(8)]
              }
              action={`${formName}-account-details-form-click`}
              label="confirm-password"
            />
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            <Button
              primary
              disabled={submitting || pristine}
              loading={submitting}
              action={`${formName}-account-details-form-click`}
              label="submit"
            >
              {buttonText}
            </Button>
          </GridColumn>
        </GridRow>
      </Grid>
    </Form>
  )
);

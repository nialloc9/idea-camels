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
    successMessage,
    submitError,
    submitting,
    pristine,
    passwordRequired = true,
    buttonText = "Sign Up",
  }) => (
    <Form error={submitError} success={successMessage} onSubmit={onSubmit}>
      <Grid container centered stackable>
        <GridRow centered columns={2}>
          <GridColumn>
            <FormInput
              label="First Name"
              name="firstName"
              defaultValue=""
              validate={[validateRequiredName]}
            />
          </GridColumn>
          <GridColumn>
            <FormInput
              label="Last Name"
              name="lastName"
              defaultValue=""
              validate={[validateRequiredLastName, validateMaxLength(20)]}
            />
          </GridColumn>
        </GridRow>
        <GridRow centered columns={2}>
          <GridColumn>
            <FormInput
              label="Email"
              type="email"
              name="email"
              defaultValue=""
              validate={[
                validateRequiredEmail,
                validateEmail,
                validateMaxLength(100),
              ]}
            />
          </GridColumn>
          <GridColumn>
            <FormInput
              label="Phone"
              name="phone"
              type="phone"
              defaultValue=""
              validate={[validateRequired, validatePhoneNumber]}
            />
          </GridColumn>
        </GridRow>
        <GridRow centered columns={2}>
          <GridColumn>
            <FormInput
              label="Password"
              name="password"
              type="password"
              defaultValue=""
              validate={
                passwordRequired
                  ? [validateRequiredPassword, validateMinLength(8)]
                  : [validateMinLength(8)]
              }
            />
          </GridColumn>
          <GridColumn>
            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              defaultValue=""
              validate={
                passwordRequired
                  ? [validateRequiredPasswordConfirmation, validateMinLength(8)]
                  : [validateMinLength(8)]
              }
            />
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            <Button
              primary
              disabled={submitting || pristine}
              isLoading={submitting}
            >
              {buttonText}
            </Button>
          </GridColumn>
        </GridRow>
      </Grid>
    </Form>
  )
);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { remCalc } from "../../utils/utils";
import { FormInput } from "../Form/Input";
import Form from "../Form/Form";
import { Grid, GridColumn } from "../Grid";
import {
  validateEmail,
  validateRequiredEmail,
  pipeline,
  useForm,
} from "../../utils/form";
import Block from "../Styled/Block";
import Button from "../Styled/Button";
import Header from "../Styled/Header";

export const ForgottenPasswordForm = ({
  isLoading,
  errorMessage,
  isSuccess,
  onModalBack,
}) => {
  const { control, handleSubmit, errors } = useForm();

  const successMessage = isSuccess
    ? "An email has been sent to the address provided."
    : "";

  return (
    <Grid container stackable columns={1}>
      <GridColumn>
        <Form
          error={errorMessage}
          success={successMessage}
          onSubmit={handleSubmit(console.log)}
        >
          <Grid stackable columns={1}>
            <GridColumn>
              <Header>Forgotten password</Header>
              <Block>
                To reset your password please enter your email below.
              </Block>
              <br />
              <FormInput
                name="email"
                size="small"
                type="text"
                placeholder="Email*"
                maxLength={40}
                rules={{
                  validate: (value) =>
                    pipeline([validateRequiredEmail, validateEmail], value),
                }}
                control={control}
                errors={errors}
              />
            </GridColumn>
            <GridColumn>
              <Button
                loading={isLoading}
                primary
                type="submit"
                margin={`0 ${remCalc(10)} 0 0`}
              >
                Submit
              </Button>
              <Button onClick={onModalBack}>Back</Button>
            </GridColumn>
          </Grid>
        </Form>
      </GridColumn>
    </Grid>
  );
};

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, GridColumn } from "../Grid";
import { remCalc } from "../../utils/style";
import { Input, FormInput } from "../Form/Input";
import { Form, Field } from "../Form/Form";
import { Checkbox } from "../Form/Checkbox";
import {
  validateEmail,
  validateRequiredEmail,
  validateRequiredPassword,
  pipeline,
  useForm,
} from "../../utils/form";
import { Block } from "../Styled/Block";
import { Button } from "../Styled/Button";
import { Header } from "../Styled/Header";

export const LoginForm = ({
  pristine,
  errorMessage,
  submitting,
  onModalCancel,
  onResetPasswordClick,
}) => {
  const { control, handleSubmit, errors } = useForm();

  return (
    <Form error={errorMessage} onSubmit={handleSubmit(this.onSubmit)}>
      <Grid stackable container columns={1}>
        <GridColumn>
          <Grid columns={2} stackable>
            <GridColumn>
              <Header>Login</Header>
            </GridColumn>
            <GridColumn />
            <GridColumn>
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
              <FormInput
                name="password"
                size="small"
                type="password"
                placeholder="Password*"
                maxLength={40}
                component={Input}
                rules={{
                  validate: (value) =>
                    pipeline([validateRequiredPassword], value),
                }}
                control={control}
                errors={errors}
              />
            </GridColumn>
          </Grid>
        </GridColumn>

        <GridColumn>
          <Block margin={`${remCalc(-15)} 0`}>
            <Block display="inline-block">
              <Field
                name="rememberMe"
                size="small"
                placeholder="Keep me loggedin"
                component={Checkbox}
              />
            </Block>
            <Block margin={`0 ${remCalc(10)}`} display="inline-block">
              Remember Me -
            </Block>
            <Block
              display="inline-block"
              onClick={onResetPasswordClick}
              cursor="pointer"
            >
              Forgotton password?
            </Block>
          </Block>
        </GridColumn>

        <GridColumn>
          <Button
            disabled={pristine || submitting}
            loading={submitting}
            primary
            type="submit"
            margin={`0 ${remCalc(10)} 0 0`}
          >
            Submit
          </Button>
          <Button onClick={onModalCancel}>Cancel</Button>
        </GridColumn>
      </Grid>
    </Form>
  );
};

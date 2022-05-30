import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, GridColumn } from "../Grid";
import { remCalc } from "../../utils/style";
import { FormInput } from "../Form/Input";
import { FormCheckbox } from "../Form/Checkbox";
import { Form } from "../Form/Form";
import {
  validateEmail,
  validateRequiredEmail,
  validateRequiredPassword,
} from "../../utils/form";
import { Block } from "../Styled/Block";
import { Button } from "../Styled/Button";
import { Header } from "../Styled/Header";
import { withForm } from "../../hoc/withForm";
import withAnalytics from "../../hoc/withAnalytics";

const AnalyticsBlock = withAnalytics(Block);

class LoginForm extends Component {
  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    onModalCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onResetPasswordClick: PropTypes.func.isRequired,
    size: PropTypes.string,
  };

  static defaultProps = {
    size: "tiny",
  };

  render() {
    const {
      submitting,
      pristine,
      submitError,
      onModalCancel,
      onResetPasswordClick,
      onSubmit,
    } = this.props;

    return (
      <Form error={submitError} onSubmit={onSubmit}>
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
                  validate={[validateRequiredEmail, validateEmail]}
                  action="login-form-click"
                  label="email"
                />
              </GridColumn>
              <GridColumn>
                <FormInput
                  name="password"
                  size="small"
                  type="password"
                  placeholder="Password*"
                  maxLength={40}
                  validate={[validateRequiredPassword]}
                  action="login-form-click"
                  label="password"
                />
              </GridColumn>
            </Grid>
          </GridColumn>

          <GridColumn>
            <Block
              margin={`${remCalc(-15)} 0`}
              display="flex"
              flexDirection="row"
            >
              <Block>
                <FormCheckbox
                  name="rememberMe"
                  size="small"
                  placeholder="Keep me loggedin"
                  action="login-form-click"
                  label="remember-me"
                />
              </Block>
              <Block
                margin={`0 ${remCalc(10)}`}
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                Remember Me -
              </Block>
              <AnalyticsBlock
                onClick={onResetPasswordClick}
                cursor="pointer"
                color="blue"
                display="flex"
                justifyContent="center"
                flexDirection="column"
                action="login-form-click"
                label="forgotton-password"
              >
                Forgotton password?
              </AnalyticsBlock>
            </Block>
          </GridColumn>

          <GridColumn>
            <Button
              disabled={submitting || pristine}
              loading={submitting}
              primary
              type="submit"
              action="login-form-click"
              label="submit"
              margin={`0 ${remCalc(10)} 0 0`}
            >
              Submit
            </Button>
            <Button
              type="button"
              action="login-form-click"
              label="cancel"
              onClick={onModalCancel}
            >
              Cancel
            </Button>
          </GridColumn>
        </Grid>
      </Form>
    );
  }
}

export default withForm(LoginForm);

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

export class ForgottenPasswordForm extends Component {
  static propTypes = {
    pristine: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isSuccess: PropTypes.bool.isRequired,
    onModalBack: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    size: PropTypes.string,
  };

  static defaultProps = {
    size: "tiny",
  };

  onSubmit = (data) => console.log(data);

  render() {
    const { isLoading, errorMessage, isSuccess, onModalBack } = this.props;

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
            onSubmit={handleSubmit(this.onSubmit)}
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
  }
}

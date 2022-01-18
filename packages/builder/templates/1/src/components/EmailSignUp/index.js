import React, { Component, Fragment } from "react";
import { Input } from "../Input";
import { Message } from "../Message";
import { withEnterKey } from "../../utils/utils";
import { handleEvent } from "../../utils/analytics";
import { post } from "../../utils/request";

export default class EmailSignUp extends Component {
  state = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    email: "",
  };

  get messageProps() {
    const { isError, isSuccess } = this.state;

    const message = isSuccess
      ? "Thank you very much. We will be in contact soon."
      : "Please try again.";

    return {
      message,
      shouldDisplay: isError || isSuccess,
      positive: isSuccess,
      negative: isError,
    };
  }

  get actionProps() {
    const { isLoading, isSuccess } = this.state;

    return {
      loading: isLoading,
      disabled: isSuccess,
      type: "button",
      content: "Sign up",
      onClick: this.handleClick,
    };
  }

  handleChange = (e, { value }) => this.setState({ email: value });

  handleClick = async () => {
    const newState = {
      isLoading: true,
      isSuccess: false,
      isError: false,
    };

    this.setState(newState);

    try {
      const { email } = this.state;

      await post(
        "https://z68olw9sk5.execute-api.eu-west-1.amazonaws.com/prod/coming-soon",
        { email }
      );

      handleEvent("email-sign-up");
    } catch (err) {
      newState.isError = true;
    } finally {
      newState.isLoading = false;
      newState.isSuccess = true;
      this.setState(newState);
    }
  };

  renderMessage = () => {
    const { message, shouldDisplay, positive, negative } = this.messageProps;

    if (!shouldDisplay) return null;

    return (
      <Message positive={positive} negative={negative}>
        {message}
      </Message>
    );
  };

  render() {
    return (
      <Fragment>
        <Input
          fluid
          placeholder="Enter your email"
          type="email"
          onChange={this.handleChange}
          onKeyUp={withEnterKey(this.state.email, this.handleClick)}
          action={this.actionProps}
        />
        {this.renderMessage()}
      </Fragment>
    );
  }
}

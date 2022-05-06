import React, { Component, Fragment } from "react";
import { Input } from "../Styled/Input";
import { Message } from "../Message";
import { withEnterKey, getQueryParameterByName } from "../../utils/utils";
import { handleEvent } from "../../utils/analytics";
import { postApi } from "../../utils/request";

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
    this.setState({
      isLoading: true,
      isSuccess: false,
      isError: false,
    });

    const { email } = this.state;

    const { error } = await postApi({
      uri: "lead/create",
      body: { email, experimentRef: getQueryParameterByName("experimentRef") },
    });

    this.setState({
      isLoading: false,
      isSuccess: !error,
      isError: !!error,
    });

    if (!error) handleEvent("lead-create");
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
        (powered by <a href="ideacamels.com">ideacamels.com</a>)
        {this.renderMessage()}
      </Fragment>
    );
  }
}

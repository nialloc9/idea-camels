import React, { Component, Fragment } from "react";
import { Input } from "../Styled/Input";
import { Message } from "../Message";
import { withEnterKey, getQueryParameterByName } from "../../utils/utils";
import { handleEvent } from "../../utils/analytics";
import { postApi } from "../../utils/request";
import withAnalytics from "../../hoc/withAnalytics";

const AnalyticsInput = withAnalytics(Input);

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

  handleChange = (e, { value }) => this.setState({ email: value });

  handleClick = async () => {
    this.setState({
      isLoading: true,
      isSuccess: false,
      isError: false,
    });

    const { email } = this.state;

    const experimentRef = getQueryParameterByName("experimentRef");

    const { error } = await postApi({
      uri: "lead/create",
      body: { email, experimentRef },
    });

    this.setState({
      isLoading: false,
      isSuccess: !error,
      isError: !!error,
    });

    if (!error) handleEvent("lead-created");
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
    const { isLoading } = this.state;

    return (
      <Fragment>
        <AnalyticsInput
          fluid
          placeholder="Enter your email"
          type="email"
          onChange={this.handleChange}
          onKeyUp={withEnterKey(this.state.email, this.handleClick)}
          disabled={isLoading}
          loading={isLoading}
          action="coming-soon-form-click"
          label="email"
        />
        (powered by <a href="ideacamels.com">ideacamels.com</a>)
        {this.renderMessage()}
      </Fragment>
    );
  }
}

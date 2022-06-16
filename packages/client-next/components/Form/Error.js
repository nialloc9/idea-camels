import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Message } from "../Styled/Message";

export class Error extends PureComponent {
  static propTypes = {
    error: PropTypes.string,
  };

  static defaultProps = {
    error: "",
  };

  render() {
    const { error, ...rest } = this.props;

    if (error === "") {
      return null;
    }

    return (
      <Message negative textAlign="center" {...rest}>
        {error}
      </Message>
    );
  }
}

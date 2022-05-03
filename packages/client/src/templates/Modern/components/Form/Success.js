import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Message } from "../Styled/Message";

export class Success extends PureComponent {
  static propTypes = {
    touched: PropTypes.bool,
    success: PropTypes.string,
  };

  static defaultProps = {
    touched: true,
    success: "",
  };

  render() {
    const { success, touched, ...rest } = this.props;

    if (success === "") {
      return null;
    }

    return (
      <Message textAlign="center" positive {...rest}>
        {success}
      </Message>
    );
  }
}

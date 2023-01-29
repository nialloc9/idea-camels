import React, { Component } from "react";
import PropTypes from "prop-types";
import { Message } from "../components/Message";

export const withMessage = (WrappedComponent) =>
  class LoaderComponent extends Component {
    static propTypes = {
      isSuccess: PropTypes.bool,
      isError: PropTypes.bool,
      textAlign: PropTypes.string,
      message: PropTypes.string,
    };

    static defaultProps = {
      isSuccess: false,
      isError: false,
      textAlign: "centre",
      message: "",
    };

    render() {
      const { isSuccess, isError, textAlign, message, ...rest } = this.props;

      return message !== "" ? (
        <Message success={isSuccess} error={isError} textAlign={textAlign}>
          {message}
        </Message>
      ) : (
        <WrappedComponent {...rest} />
      );
    }
  };

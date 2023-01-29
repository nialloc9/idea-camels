import React, { Component } from "react";
import PropTypes from "prop-types";

export const withDisplay = (WrappedComponent) =>
  class LoaderComponent extends Component {
    static propTypes = {
      isDisplayed: PropTypes.bool,
    };

    static defaultProps = {
      isDisplayed: true,
    };

    render() {
      const { isDisplayed, ...rest } = this.props;

      return isDisplayed ? <WrappedComponent {...rest} /> : null;
    }
  };

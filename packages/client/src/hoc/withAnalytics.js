import React, { Component } from "react";
import PropTypes from "prop-types";
import { handleEvent } from "../utils/analytics";
import { logger } from "../utils/utils";

/**
 * RULES
 * action for element + action e.g home-page-image-click
 * additional information such as url, button text, form field name, or buttion text e.g firstname
 * https://mixedanalytics.com/blog/event-tracking-naming-strategy-for-google-analytics/#:~:text=EVENT%20LABEL%20NAMING,text%2C%20scroll%20percent%2C%20etc.
 */
export default (WrappedComponent) =>
  class Event extends Component {
    static propTypes = {
      action: PropTypes.string.isRequired,
      label: PropTypes.string,
    };

    handleClick = (...e) => {
      const {
        action,
        label = window.location.pathname.substr(1).split("/")[0],
        onClick,
      } = this.props;

      try {
        handleEvent(action, label);
      } catch (error) {
        logger.error(error);
      }

      if (onClick) {
        onClick(...e);
      }
    };

    render() {
      const { action, label, onClick, ...rest } = this.props;

      return <WrappedComponent {...rest} onClick={this.handleClick} />;
    }
  };

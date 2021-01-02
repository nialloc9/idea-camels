import React, { Component } from "react";
import PropTypes from "prop-types";
import { Popup } from "semantic-ui-react";

const withToolTip = (WrappedComponent) =>
  class ToolTip extends Component {
    static propTypes = {
      position: PropTypes.string,
      tooltip: PropTypes.string,
    };

    static defaultProps = {
      position: "top center",
      tooltip: "",
    };

    render() {
      const { position, tooltip, ...rest } = this.props;

      if (tooltip === "") {
        return <WrappedComponent {...rest} />;
      }

      return (
        <Popup
          trigger={<WrappedComponent {...rest} />}
          position={position}
          content={tooltip}
        />
      );
    }
  };

export default withToolTip;

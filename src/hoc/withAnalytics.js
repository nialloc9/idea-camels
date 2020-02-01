import React, { Component } from "react";
import PropTypes from "prop-types";
import { handleEvent } from "utils/analytics"

export default WrappedComponent =>
    class Event extends Component {
        static propTypes = {
            action: PropTypes.string.isRequired,
            label: PropTypes.string
        };

        handleClick = (...e) => {
            const { action, label, onClick } = this.props;

            handleEvent(action, label);

            if(onClick) {
                onClick(...e);
            }
        }

        render() {
            const { action, label, onClick, ...rest } = this.props;

            return <WrappedComponent {...rest} onClick={this.handleClick} />;
        }
    };

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Loader } from "../components/Loader";

export const withLoader = WrappedComponent =>
    class LoaderComponent extends Component {
        static propTypes = {
            isLoading: PropTypes.bool,
            isInline: PropTypes.bool,
            loadingIconSize: PropTypes.string
        };

        static defaultProps = {
            isLoading: false,
            isInline: true,
            loadingIconSize: "mini"
        };

        render() {
            const { isLoading, loadingIconSize,  isInline, ...rest } = this.props;

            return isLoading ? <Loader size={loadingIconSize} inline={isInline} /> : <WrappedComponent {...rest} />
        }
    };
import React, { Component } from "react";
import { handlePageView } from "../utils/analytics";

export default (WrappedComponent) =>
  class Event extends Component {
    componentDidMount() {
      handlePageView();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

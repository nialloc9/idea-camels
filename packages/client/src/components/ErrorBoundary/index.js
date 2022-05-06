import React from "react";
import { Message } from "../Message";
import { postApi } from "../../utils/request";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("error", { error, errorInfo });
    postApi({ uri: "log/error", body: { error, errorInfo } });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Message negative>
          Oops, something went wrong. Please reload your browser.
        </Message>
      );
    }

    return this.props.children;
  }
}

import React, { Component } from "react";
import { Form, Input } from "semantic-ui-react";
import { Button } from "../Styled/Button";
import { Message } from "../Styled/Message";

export default class EditableButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.initialText,
      errorMessage: "",
      isOpen: false,
    };
  }

  get buttonProps() {
    const { initialText, ...rest } = this.props;

    return rest;
  }

  handleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  handleChange = (e, { value }) => this.setState({ text: value });

  validate = (text) => {
    const { initialText, minOffset = 0, min, max } = this.props;

    const minMinusOffset = initialText.length - minOffset; // minOffset is number of characters from end of inital text

    if (min && text.length < min) {
      return `Min ${min}`;
    }

    if (min && text.length > max) {
      return `Max ${min}`;
    }

    if (text.length < minMinusOffset) {
      return `Min ${minMinusOffset}`;
    }

    return text.length > initialText.length ? `Max ${initialText.length}` : "";
  };

  hanndleKeyChange = (e) => {
    const { text } = this.state;
    const { onSubmit } = this.props;

    const errorMessage = this.validate(text);

    if (errorMessage !== "") {
      return this.setState({ errorMessage });
    }

    if (e.key === "Enter") {
      e.preventDefault();
      this.setState({ isOpen: false });
      onSubmit(text);
    }
  };

  render() {
    const { isOpen, text, errorMessage } = this.state;

    if (!isOpen) {
      return (
        <Button
          {...this.buttonProps}
          hoverFilter={false}
          hoverOpacity="0.5"
          action="editable-button-click"
          onClick={this.handleOpen}
        >
          {text}
        </Button>
      );
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          value={text}
          onChange={this.handleChange}
          onKeyPress={this.hanndleKeyChange}
        />
        {errorMessage !== "" && (
          <Message negative textAlign="center">
            {errorMessage}
          </Message>
        )}
      </Form>
    );
  }
}

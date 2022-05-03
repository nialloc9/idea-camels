import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { TextArea } from "../Styled/TextArea";
import { Message } from "../Styled/Message";
import { styled } from "../../../../utils/style";

const Edit = styled.span`
  cursor: pointer;
  color: ${({ color }) => color};
  :hover {
    opacity: 0.5;
  }
`;

export default class EditableText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.initialText,
      errorMessage: "",
      isOpen: false,
    };
  }

  handleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  handleChange = (e, { value }) => this.setState({ text: value });

  validate = (text) => {
    const { initialText, minOffset = 0, min, max } = this.props;

    const minMinusOffset = initialText.length - minOffset; // minOffset is number of characters from end of inital text

    if (min && text.length < min) {
      return `Min ${min}`;
    }

    if (max && text.length > max) {
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

      this.setState({ isOpen: false, errorMessage: "" });
      onSubmit(text);
    }
  };

  render() {
    const { isOpen, text, errorMessage } = this.state;
    const { rows = 1, width, maxWidth, color } = this.props;

    if (!isOpen) {
      return (
        <Edit color={color} onClick={this.handleOpen}>
          {text}
        </Edit>
      );
    }

    return (
      <Form>
        <TextArea
          width={width}
          maxWidth={maxWidth}
          rows={rows}
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

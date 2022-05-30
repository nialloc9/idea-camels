import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { TextArea } from "../Styled/TextArea";
import { Message } from "../Styled/Message";
import { styled } from "../../../../utils/style";
import withAnalytics from "../../../../hoc/withAnalytics";

const Edit = styled.span`
  cursor: pointer;
  color: ${({ color }) => color};
  :hover {
    opacity: 0.5;
  }
`;

const AnalyticsEdit = withAnalytics(Edit);

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

  hanndleKeyChange = (e) => {
    const { text } = this.state;
    const { onSubmit } = this.props;

    if (e.key === "Enter") {
      e.preventDefault();

      this.setState({ isOpen: false, errorMessage: "" });
      onSubmit(text);
    }
  };

  render() {
    const { isOpen, text, errorMessage } = this.state;
    const { rows = 1, width, maxWidth, color, action, label } = this.props;

    if (!isOpen) {
      return (
        <AnalyticsEdit
          action={action}
          label={label}
          color={color}
          onClick={this.handleOpen}
        >
          {text}
        </AnalyticsEdit>
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

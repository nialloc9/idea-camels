import React, { Component } from "react";
import { Form, TextArea, Message } from "semantic-ui-react";
import { styled, remCalc } from "../../utils/style";
import withAnalytics from "../../hoc/withAnalytics";

const Edit = styled.span`
  cursor: pointer;
  color: ${({ color }) => color};
  :hover {
    opacity: 0.5;
  }
`;

const AnalyticsEdit = withAnalytics(Edit);

export default (Child) =>
  class EditableText extends Component {
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

    handleKeyChange = (e) => {
      const { text } = this.state;
      const { onSubmit } = this.props;

      if (e.key === "Enter") {
        e.preventDefault();

        this.setState({ isOpen: false, errorMessage: "" });
        onSubmit(text);
      }
    };

    componentDidMount() {
      if (this.divElement) {
        const height = this.divElement.clientHeight;
        const width = this.divElement.clientWidth;
        this.setState({ height, width });
      }
    }

    render() {
      const { isOpen, text, errorMessage, height, width } = this.state;
      const {
        rows = 1,
        maxWidth,
        color,
        action,
        label,
        appearAfterText,
        ...rest
      } = this.props;

      if (!isOpen) {
        return (
          <AnalyticsEdit
            action={action}
            label={label}
            color={color}
            onClick={this.handleOpen}
            ref={(divElement) => {
              this.divElement = divElement;
            }}
          >
            <Child {...rest}>
              {text} {appearAfterText}
            </Child>
          </AnalyticsEdit>
        );
      }

      return (
        <Form>
          <TextArea
            width={width}
            maxWidth={maxWidth}
            minHeight={remCalc(height)}
            rows={rows}
            value={text}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyChange}
            style={{
              minheight: remCalc(height + 20),
              minwidth: remCalc(width),
            }}
          />
          {errorMessage !== "" && (
            <Message negative textAlign="center">
              {errorMessage}
            </Message>
          )}
        </Form>
      );
    }
  };

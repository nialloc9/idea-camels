import React, { Component } from "react";
import { Form, Input } from "semantic-ui-react";
import { Button } from "../Styled/Button";
import { TextArea } from "../Styled/TextArea";
import { Block } from "../Styled/Block";
import { Image, BackgroundImage } from "../Styled/Image";
import { Message } from "../Styled/Message";
import { FileUpload } from "../Form/FileUpload";
import { styled } from "../../utils/style";

const Edit = styled.span`
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
`;

const FileUploadContainer = styled.span`
  margin: auto;
  display: flex;
  justify-content: center;
`;
export class EditableText extends Component {
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

      this.setState({ isOpen: false, errorMessage: "" });
      onSubmit(text);
    }
  };

  render() {
    const { isOpen, text, errorMessage } = this.state;
    const { rows = 1, width, maxWidth } = this.props;

    if (!isOpen) {
      return <Edit onClick={this.handleOpen}>{text}</Edit>;
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

export class EditableButton extends Component {
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

export class EditableImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
      isOpen: false,
      src: props.src,
    };
  }

  get imageProps() {
    const {
      iconSize,
      borderStyle,
      border,
      padding,
      label = "Upload Image",
      ...rest
    } = this.props;

    return rest;
  }
  handleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  handleSubmit = (files) => {
    const { onSubmit } = this.props;
    onSubmit(files[0]);
    this.setState({ isOpen: false, src: createImagePreview(files[0]) });
  };

  handeError = (files) => {
    const { errors } = files[0];

    const { message } = errors[0];

    this.setState({ error: message });
  };

  render() {
    const { isOpen, error, src } = this.state;

    const {
      iconSize,
      borderStyle,
      border,
      padding,
      label = "Upload Image",
      editMinHeight,
    } = this.props;

    if (!isOpen) {
      return (
        <Edit onClick={this.handleOpen}>
          <Image {...this.imageProps} src={src} key={src} />
        </Edit>
      );
    }

    return (
      <Block
        textAlign="center"
        margin="auto"
        display="flex"
        justifyContent="center"
      >
        <Block
          display="flex"
          justifyContent="center"
          flexDirection="column"
          minHeight={editMinHeight}
        >
          <FileUpload
            iconSize={iconSize}
            borderStyle={borderStyle}
            border={border}
            padding={padding}
            label={label}
            accept="image/jpeg, image/png"
            error={error}
            onSubmit={this.handleSubmit}
            onError={this.handeError}
          />
        </Block>
      </Block>
    );
  }
}

export class EditableBackgroundImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
      isOpen: false,
      src: props.src,
    };
  }

  get imageProps() {
    const {
      iconSize,
      borderStyle,
      border,
      padding,
      label = "Upload Image",
      ...rest
    } = this.props;

    return rest;
  }

  handleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  handleSubmit = (files) => {
    const { onSubmit } = this.props;
    onSubmit(files[0]);
    this.setState({ isOpen: false, src: createImagePreview(files[0]) });
  };

  handeError = (files) => {
    const { errors } = files[0];

    const { message } = errors[0];

    this.setState({ error: message });
  };

  render() {
    const { isOpen, error, src } = this.state;

    const {
      iconSize,
      borderStyle,
      border,
      padding,
      label = "Upload Image",
      editMinHeight,
    } = this.props;

    if (!isOpen) {
      return (
        <Edit onClick={this.handleOpen}>
          <BackgroundImage {...this.imageProps} src={src} key={src} />
        </Edit>
      );
    }

    return (
      <Block
        textAlign="center"
        margin="auto"
        display="flex"
        justifyContent="center"
      >
        <Block
          display="flex"
          justifyContent="center"
          flexDirection="column"
          minHeight={editMinHeight}
        >
          <FileUpload
            iconSize={iconSize}
            borderStyle={borderStyle}
            border={border}
            padding={padding}
            label={label}
            accept="image/jpeg, image/png"
            error={error}
            onSubmit={this.handleSubmit}
            onError={this.handeError}
          />
        </Block>
      </Block>
    );
  }
}

/**
 * @description creates an image src from a file uploaded
 * @param {*} file
 */
export const createImagePreview = (file) => URL.createObjectURL(file);

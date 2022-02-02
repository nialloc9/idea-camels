import React, { Component } from "react";
import { Block } from "../Styled/Block";
import { BackgroundImage } from "../Styled/Image";
import { FileUpload } from "../Form/FileUpload";
import { styled } from "../../../../utils/style";
import { createImagePreview } from "../../../../utils/utils";

const Edit = styled.span`
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
`;

export default class EditableBackgroundImage extends Component {
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

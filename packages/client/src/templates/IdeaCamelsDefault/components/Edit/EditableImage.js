import React, { Component } from "react";
import { Block } from "../Styled/Block";
import { Image } from "../Styled/Image";
import { FileUpload } from "../Form/FileUpload";
import { styled } from "../../../../utils/style";
import { upload } from "../../../../utils/request";
import { connect } from "../../../../store";

const Edit = styled.span`
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
`;

class EditableImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
      isOpen: false,
      isLoading: false,
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

  handleSubmit = async (files) => {
    try {
      this.setState({ isLoading: true });
      const { token } = this.props;
      const { url } = await upload({ file: files[0], token });
      const { onSubmit } = this.props;

      onSubmit(url);
      this.setState({ isOpen: false, src: url, isLoading: false });
    } catch ({ message }) {
      this.setState({ error: message, isLoading: false });
    }
  };

  handeError = (files) => {
    const { errors } = files[0];

    const { message } = errors[0];

    this.setState({ error: message });
  };

  render() {
    const { isOpen, error, src, isLoading } = this.state;

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
            isLoading={isLoading}
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

const mapStateToProps = ({ account: { token } }) => ({
  token,
});

export default connect(mapStateToProps, {})(EditableImage);

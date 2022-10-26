import React, { Component } from "react";
import { Block } from "../../components/Styled/Block";
import { FileUpload } from "../../components/Form/FileUpload";
import { styled, remCalc } from "../../utils/style";
import { upload } from "../../utils/request";
import { handleResizeFile } from "../../utils/utils";
import { connect } from "../../store";
import withAnalytics from "../../hoc/withAnalytics";

const Edit = styled.span`
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }

  height: ${({ height }) => remCalc(height)};
`;

class EditableImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
      isOpen: false,
      isLoading: false,
      src: props.src,
      imageDimensions: {},
    };
  }

  get imageProps() {
    const {
      iconSize,
      borderStyle,
      border,
      padding,
      maxImageHeight,
      maxImageWidth,
      maxImageSize,
      label,
      ...rest
    } = this.props;

    return rest;
  }
  handleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  handleSubmit = async (files) => {
    try {
      const {
        token,
        maxImageHeight,
        maxImageWidth,
        maxImageSize,
        onSubmit,
      } = this.props;

      this.setState({ isLoading: true });

      const resizedImage = await handleResizeFile({
        file: files[0],
        maxHeight: maxImageHeight,
        maxWidth: maxImageWidth,
        size: maxImageSize,
      });

      const { url } = await upload({ file: resizedImage, token });

      onSubmit(url);
      this.setState({ isOpen: false, src: url, isLoading: false });
    } catch (e) {
      console.log(e);
      const { message } = e;
      this.setState({ error: message, isLoading: false });
    }
  };

  handeError = (files) => {
    const { errors } = files[0];

    const { message } = errors[0];

    this.setState({ error: message });
  };

  onCancel = () => this.setState({ isOpen: false });

  render() {
    const { isOpen, error, src, isLoading } = this.state;

    const {
      iconSize,
      borderStyle,
      border,
      padding,
      labelText = "Upload Image",
      height,
      containerHeight,
      component: Child,
    } = this.props;

    if (!isOpen) {
      return (
        <Edit height={containerHeight} onClick={this.handleOpen}>
          <Child
            {...this.imageProps}
            src={src}
            key={src}
            id={src}
            style={{
              maxHeight: height,
              minHeight: height,
            }}
          />
        </Edit>
      );
    }

    return (
      <Block
        textAlign="center"
        margin="auto"
        display="flex"
        justifyContent="center"
        height={containerHeight ? remCalc(containerHeight) : remCalc(height)}
      >
        <Block
          display="flex"
          justifyContent="center"
          flexDirection="column"
          height={containerHeight ? remCalc(containerHeight) : remCalc(height)}
        >
          <FileUpload
            isLoading={isLoading}
            iconSize={iconSize}
            borderStyle={borderStyle}
            border={border}
            padding={padding}
            label={labelText}
            accept="image/jpeg, image/png"
            error={error}
            onSubmit={this.handleSubmit}
            onError={this.handeError}
            onCancel={this.onCancel}
          />
        </Block>
      </Block>
    );
  }
}

const mapStateToProps = ({ account: { token } }) => ({
  token,
});

export default connect(mapStateToProps, {})(withAnalytics(EditableImage));

import React, { Component } from "react";
import { TextArea, Form, Input } from 'semantic-ui-react'
import { Button } from '../Styled/Button'
import { Image, BackgroundImage } from '../Styled/Image'
import { FileUpload } from '../Form/FileUpload'
import { styled } from "../../utils/style";

const Edit = styled.span`
  cursor: pointer;
  :hover {
    opacity: 0.5
  }
`;

const FileUploadContainer = styled.span`
  margin: auto;
  display: flex;
  justify-content: center;
`;
export class EditableText extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      text: this.props.initialText,
      isOpen: false
    }
  }

  handleOpen = () => this.setState({ isOpen: !this.state.isOpen })

  handleChange = (e, { value }) => this.setState({ text: value })

  hanndleKeyChange = (e) => {
    const { text } = this.state;
    const { onSubmit } = this.props;
    console.log('key', e.key)
    if (e.key === "Enter") {
      e.preventDefault();
      this.setState({ isOpen: false })
      onSubmit(text);
    } 

  }
  
  render() {
    const { isOpen, text } = this.state;

    if(!isOpen) {
        return (
            <Edit onClick={this.handleOpen}>{text}</Edit>
          )
    }

    return (
        <Form>
          <TextArea value={text} onChange={this.handleChange} onKeyPress={this.hanndleKeyChange} />
        </Form>
    )
  }
}

export class EditableButton extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      text: this.props.initialText,
      isOpen: false
    }
  }

  get buttonProps() {
    const {initialText, ...rest  } = this.props;

    return rest;
  }

  handleOpen = () => this.setState({ isOpen: !this.state.isOpen })

  handleChange = (e, { value }) => this.setState({ text: value })

  hanndleKeyChange = (e) => {
    const { text } = this.state;
    const { onSubmit } = this.props;
    
    if (e.key === "Enter") {
      e.preventDefault();
      this.setState({ isOpen: false })
      onSubmit(text);
    } 

  }
  
  render() {
    const { isOpen, text } = this.state;

    if(!isOpen) {
        return <Button {...this.buttonProps} hoverFilter={false} hoverOpacity="0.5" onClick={this.handleOpen}>{text}</Button>
    }

    return (
        <Form onSubmit={this.handleSubmit}>
          <Input value={text} onChange={this.handleChange} onKeyPress={this.hanndleKeyChange} />
        </Form>
    )
  }
}

export class EditableImage extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      error: undefined,
      isOpen: false,
      src: props.src
    }
  }
  
  get imageProps() {
    const { iconSize, borderStyle, border, padding, label = "Upload Image", ...rest } = this.props;

    return rest
  }
  handleOpen = () => this.setState({ isOpen: !this.state.isOpen })

  handleSubmit = (files) => {
    const { onSubmit } = this.props;
    onSubmit(files[0]);
    this.setState({ isOpen: false })
  }
  
  handeError = files => {
    const { errors } = files[0];

    const { message } = errors[0];

    this.setState({ error: message })
  };
  render() {
    const { isOpen, error, src } = this.state;
    
    const { iconSize, borderStyle, border, padding, label = "Upload Image" } = this.props;

    if(!isOpen) {
        return <Edit onClick={this.handleOpen}><Image {...this.imageProps} src={src} key={src} /></Edit>
    }
    
    return (
      <FileUpload iconSize={iconSize} borderStyle={borderStyle} border={border} padding={padding}  label={label} accept="image/jpeg, image/png" error={error} onSubmit={this.handleSubmit} onError={this.handeError} />
    )
  }
}

export class EditableBackgroundImage extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      error: undefined,
      isOpen: false,
      src: props.src
    }
  }
  
  get imageProps() {
    const { iconSize, borderStyle, border, padding, label = "Upload Image", ...rest } = this.props;

    return rest
  }

  handleOpen = () => this.setState({ isOpen: !this.state.isOpen })

  handleSubmit = (files) => {
    const { onSubmit } = this.props;
    onSubmit(files[0]);
    this.setState({ isOpen: false })
  }
  
  handeError = files => {
    const { errors } = files[0];

    const { message } = errors[0];

    this.setState({ error: message })
  }

  render() {
    const { isOpen, error, src } = this.state;
    
    const { iconSize, borderStyle, border, padding, label = "Upload Image" } = this.props;
    
    if(!isOpen) {
        return <Edit onClick={this.handleOpen}><BackgroundImage {...this.imageProps} src={src} key={src} /></Edit>
    }
    
    return (
      <FileUploadContainer><FileUpload iconSize={iconSize} borderStyle={borderStyle} border={border} padding={padding}  label={label} accept="image/jpeg, image/png" error={error} onSubmit={this.handleSubmit} onError={this.handeError} /></FileUploadContainer>
    )
  }
}

/**
 * @description creates an image src from a file uploaded
 * @param {*} file 
 */
export const createImagePreview = file => URL.createObjectURL(file);
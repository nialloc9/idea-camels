import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "semantic-ui-react";

const withModal = (WrappedComponent) =>
  class ToolTip extends Component {
    static propTypes = {
      buttonText: PropTypes.string,
      modalHeaderText: PropTypes.string,
    };

    static defaultProps = {
      buttonText: "Open",
      modalHeaderText: "",
    };

    state = {
      isOpen: false,
    };

    onOpen = () => this.setState({ isOpen: true });

    onClose = () => this.setState({ isOpen: false });

    render() {
      const { buttonText, modalHeaderText, ...rest } = this.props;
      const { isOpen } = this.state;

      return (
        <Fragment>
          <Button primary onClick={this.onOpen}>
            {buttonText}
          </Button>
          <Modal open={isOpen} closeIcon onClose={this.onClose}>
            {modalHeaderText !== "" && (
              <Modal.Header>{modalHeaderText}</Modal.Header>
            )}
            <Modal.Content>
              <WrappedComponent
                {...rest}
                isModalOpen={isOpen}
                onModalOpen={this.onOpen}
                onModalClose={this.onModalClose}
              />
            </Modal.Content>
          </Modal>
        </Fragment>
      );
    }
  };

export default withModal;

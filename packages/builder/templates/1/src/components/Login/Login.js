import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalContent } from "../Modal";
import { LoginForm } from "./LoginForm";
// import {ForgottenPasswordForm} from './ForgottenPasswordForm';
import { Block } from "../Styled/Block";

export class Login extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    forgottonPasswordErrorMessage: PropTypes.string.isRequired,
    isForgottenPasswordSuccess: PropTypes.bool.isRequired,
    isForgottenPasswordLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    onSetForgottenPassword: PropTypes.func.isRequired,
    size: PropTypes.string,
  };

  state = {
    openForm: 1,
  };

  handleBack = () => this.setState({ openForm: 1 });

  handleForward = () => this.setState({ openForm: 2 });

  static defaultProps = {
    size: "tiny",
  };

  handleModalOpen = () => {
    const { isOpen, onSetLoginModal } = this.props;
    onSetLoginModal(!isOpen);
  };

  render() {
    const {
      isOpen,
      errorMessage,
      size,
      forgottonPasswordErrorMessage,
      isForgottenPasswordSuccess,
      isForgottenPasswordLoading,
      onSetLogin,
      onSetForgottenPassword,
      children,
    } = this.props;

    const { openForm } = this.state;

    return (
      <Modal
        open={isOpen}
        onClose={this.handleModalOpen}
        onActionClick={this.handleModalOpen}
        closeOnEscape
        trigger={
          <Block cursor="pointer" onClick={this.handleModalOpen}>
            {children}
          </Block>
        }
        size={size}
      >
        <ModalContent>
          {openForm === 1 && (
            <LoginForm
              errorMessage={errorMessage}
              onModalCancel={this.handleModalOpen}
              onResetPasswordClick={this.handleForward}
              onSubmit={onSetLogin}
            />
          )}
          {/* {openForm === 2 && (
                        <ForgottenPasswordForm
                            errorMessage={forgottonPasswordErrorMessage}
                            isSuccess={isForgottenPasswordSuccess}
                            isLoading={isForgottenPasswordLoading}
                            onModalBack={this.handleBack}
                            onSubmit={onSetForgottenPassword}
                        />
                    )} */}
        </ModalContent>
      </Modal>
    );
  }
}

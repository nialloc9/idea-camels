import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalContent } from "../Modal";
import LoginForm from "./LoginForm";
import ForgottenPasswordForm from "./ForgottonPasswordForm";
import {
  onFetchAccount,
  onForgottonPassword,
} from "../../store/actions/account";
import { connect } from "../../store";
import { onSetIsLogin } from "../../store/actions/app";

class Login extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    resetPassword: PropTypes.func.isRequired,
    size: PropTypes.string,
  };

  state = {
    openForm: 1,
  };

  get modelProps() {
    const { isOpen, size, Trigger } = this.props;

    return {
      open: isOpen,
      onClose: this.handleModalOpen,
      onActionClick: this.handleModalOpen,
      closeOnEscape: true,
      trigger: <Trigger onClick={this.handleModalOpen} />,
      size: size,
    };
  }

  get loginFormProps() {
    const { fetchAccount } = this.props;

    return {
      onSubmit: fetchAccount,
      onModalCancel: this.handleModalOpen,
      onResetPasswordClick: this.handleForward,
    };
  }

  get forgottonPasswordFormProps() {
    const { forgottonPasswordSuccessMessage, forgottonPassword } = this.props;

    return {
      successMessage: forgottonPasswordSuccessMessage,
      onModalBack: this.handleBack,
      onSubmit: forgottonPassword,
    };
  }

  handleBack = () => this.setState({ openForm: 1 });

  handleForward = () => this.setState({ openForm: 2 });

  static defaultProps = {
    size: "tiny",
  };

  handleModalOpen = () => {
    const { isOpen, onOpen } = this.props;
    onOpen(!isOpen);
  };

  render() {
    const { openForm } = this.state;

    return (
      <Modal {...this.modelProps}>
        <ModalContent>
          {openForm === 1 && <LoginForm {...this.loginFormProps} />}
          {openForm === 2 && (
            <ForgottenPasswordForm {...this.forgottonPasswordFormProps} />
          )}
        </ModalContent>
      </Modal>
    );
  }
}

const mapStateToProps = ({
  app: { isLoginOpen },
  account: { forgottonPasswordSuccessMessage },
}) => ({
  isOpen: isLoginOpen,
  forgottonPasswordSuccessMessage,
});

export default connect(mapStateToProps, {
  fetchAccount: onFetchAccount,
  onOpen: onSetIsLogin,
  forgottonPassword: onForgottonPassword,
})(Login);

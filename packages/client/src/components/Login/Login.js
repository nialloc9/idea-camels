import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from '../../utils/form'
import {Modal, ModalContent} from '../Modal';
import LoginForm from './LoginForm';
import ForgottenPasswordForm from './ForgottonPasswordForm';
import {onFetchAccount, onForgottonPassword} from '../../store/actions/account';
import {onSetIsLogin} from '../../store/actions/app';

class Login extends Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        forgottonPasswordErrorMessage: PropTypes.string.isRequired,
        isForgottenPasswordSuccess: PropTypes.bool.isRequired,
        isForgottenPasswordLoading: PropTypes.bool.isRequired,
        errorMessage: PropTypes.string.isRequired,
        resetPassword: PropTypes.func.isRequired,
        size: PropTypes.string,
    };

    state = {
        openForm: 1,
    };

    get modelProps() {
        const {
            isOpen,
            size,
            Trigger
        } = this.props;

        return {
            open: isOpen,
            onClose: this.handleModalOpen,
            onActionClick: this.handleModalOpen,
            closeOnEscape: true,
            trigger: <Trigger onClick={this.handleModalOpen} />,
            size: size
        }
    }

    get loginFormProps() {
        const { fetchErrorMessage, isFetchLoading, fetchAccount } = this.props;

        return {
            isLoading: isFetchLoading,
            errorMessage: fetchErrorMessage,
            onSubmit: fetchAccount,
            onModalCancel: this.handleModalOpen,
            onResetPasswordClick: this.handleForward,
        }
    }

    get forgottonPasswordFormProps() {
        const { 
            forgottonPasswordErrorMessage,
            forgottonPasswordSuccessMessage,
            isForgottenPasswordLoading,
            forgottonPassword
         } = this.props;

        return {
            errorMessage: forgottonPasswordErrorMessage,
            successMessage: forgottonPasswordSuccessMessage,
            isLoading: isForgottenPasswordLoading,
            onModalBack: this.handleBack,
            onSubmit: forgottonPassword
        }
    }

    handleBack = () => this.setState({openForm: 1});

    handleForward = () => this.setState({openForm: 2});

    static defaultProps = {
        size: 'tiny',
    };

    handleModalOpen = () => {
        const {isOpen, onOpen} = this.props;
        onOpen(!isOpen);
    };

    render() {
        const {openForm} = this.state;
        
        return (
            <Modal {...this.modelProps}>
                <ModalContent>
                    {openForm === 1 && <LoginForm {...this.loginFormProps}/>}
                    {openForm === 2 && <ForgottenPasswordForm {...this.forgottonPasswordFormProps} />}
                </ModalContent>
            </Modal>
        );
    }
}

const mapStateToProps = ({ app: { isLoginOpen }, account: { isFetchLoading, fetchErrorMessage, forgottonPasswordErrorMessage, forgottonPasswordSuccessMessage } }) => ({
    isOpen: isLoginOpen,
    isFetchLoading,
    fetchErrorMessage,
    forgottonPasswordErrorMessage,
    forgottonPasswordSuccessMessage
  })
  
export default connect(
    mapStateToProps,
    { fetchAccount: onFetchAccount, onOpen: onSetIsLogin, forgottonPassword: onForgottonPassword }
)(Login)

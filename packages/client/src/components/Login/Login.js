import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {Modal, ModalContent} from '../Modal';
import LoginForm from './LoginForm';
// import {ForgottenPasswordForm} from './ForgottenPasswordForm';
import {onFetchAccount} from '../../store/actions/account';
import {onSetIsLogin} from '../../store/actions/app';

class Login extends Component {
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

    get modelProps() {
        const {
            isLoginOpen,
            size,
            Trigger
        } = this.props;

        return {
            open: isLoginOpen,
            onClose: this.handleModalOpen,
            onActionClick: this.handleModalOpen,
            closeOnEscape: true,
            trigger: <Trigger onClick={this.handleModalOpen} />,
            size: size
        }
    }

    get loginFormProps() {
        const { fetchErrorMessage } = this.props;

        return {
            errorMessage: fetchErrorMessage,
            onSubmit: this.onFetchAccount,
            onModalCancel: this.handleModalOpen,
            onResetPasswordClick: this.handleForward,
        }
    }

    get forgottonPasswordFormProps() {
        const { 
            forgottonPasswordErrorMessage,
            isForgottenPasswordSuccess,
            isForgottenPasswordLoading,
            onSetForgottenPassword
         } = this.props;

        return {
            errorMessage: forgottonPasswordErrorMessage,
            isSuccess: isForgottenPasswordSuccess,
            isLoading: isForgottenPasswordLoading,
            onModalBack: this.handleBack,
            onSubmit: onSetForgottenPassword
        }
    }

    onFetchAccount = async ({ email, password, rememberMe }) => {
        const { fetchAccount } = this.props;

        await fetchAccount({ email, password, rememberMe })
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
                    {/* {openForm === 2 && <ForgottenPasswordForm {...this.forgottonPasswordFormProps} />} */}
                </ModalContent>
            </Modal>
        );
    }
}

const mapStateToProps = ({ app: { isLoginOpen } }) => ({
    isLoginOpen
  })
  
export default connect(
    mapStateToProps,
    { fetchAccount: onFetchAccount, onOpen: onSetIsLogin }
)(Login)
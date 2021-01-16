import {ACCOUNT_SET} from '../constants/account';
import {postApi} from '../../utils/request';

/**
 * sets the loading state
 * @param payload
 */
const setState = dispatch => payload => dispatch({
    type: ACCOUNT_SET,
    payload
});

export const onFetchAccount = ({ email, password, rememberMe = false }) => async dispatch => {
    const onSetState = setState(dispatch);
    const payload = { isFetchLoading: true, fetchErrorMessage: '' };
    try {
        onSetState(payload);
        
        const response = await postApi(`account/login`, { email, password, rememberMe });
        console.log("Res", response)
        const { data: { token, account } } = response
         
        payload.token = token;
        payload.data = account;
        payload.fetchErrorMessage = '';
    } catch ({ message }) {
        payload.fetchErrorMessage = message;
    } finally {
        payload.isFetchLoading = false;
        onSetState(payload)
    }
};

export const onCreateAccount = ({ firstName, lastName, phone, email, password, confirmPassword }) => async dispatch => {
    const onSetState = setState(dispatch);
    const payload = { isCreateLoading: true, createErrorMessage: '' };
    try {

        if(password !== confirmPassword) {
            return onSetState({ createErrorMessage: "Passwords do not match" })
        }
        onSetState(payload);
        
        const response = await postApi(`account/create`, { firstName, lastName, phone, email, password });

        const { data: { token } } = response
        payload.token = token;
        payload.data = {
            firstName,
            lastName,
            phone,
            email,
            password
        };
        payload.createErrorMessage = '';
    } catch ({ message }) {
        payload.createErrorMessage = message;
    } finally {
        payload.isCreateLoading = false;
        onSetState(payload)
    }
};

export const onForgottonPassword = ({ email }) => async dispatch => {
    const onSetState = setState(dispatch);
    const payload = { isForgottonPasswordLoading: true, forgottonPasswordErrorMessage: '', forgottonPasswordSuccessMessage: '' };
    try {
        onSetState(payload);
        
        const response = await postApi(`account/forgotton-password`, { email });

        const { data: { token } } = response
        payload.token = token;
        payload.createErrorMessage = '';
    } catch ({ message }) {
        payload.forgottonPasswordErrorMessage = message;
    } finally {
        payload.isForgottonPasswordLoading = false;
        payload.forgottonPasswordSuccessMessage = `An email has been sent to ${email}.`;
        onSetState(payload)
    }
};
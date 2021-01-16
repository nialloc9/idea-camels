import {ACCOUNT_SET} from '../constants/account';
import {postApi} from '../../utils/request';
import {getError} from '../../utils/errors';

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

        const { data: { token, ...rest } } = response
        payload.token = token;
        payload.data = rest;
        payload.fetchErrorMessage = '';
    } catch (error) {
        payload.fetchErrorMessage = getError(error);
    } finally {
        payload.isFetchLoading = false;
        onSetState(payload)
    }
};

export const onCreateAccount = ({ firstName, lastName, phone, email, password }) => async dispatch => {
    const onSetState = setState(dispatch);
    const payload = { isCreateLoading: true, createErrorMessage: '' };
    try {
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
    } catch (error) {
        payload.createErrorMessage = getError(error);
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
    } catch (error) {
        payload.forgottonPasswordErrorMessage = getError(error);;
    } finally {
        payload.isForgottonPasswordLoading = false;
        payload.forgottonPasswordSuccessMessage = `An email has been sent to ${email}.`;
        onSetState(payload)
    }
};

export const setError = (createErrorMessage) => dispatch => dispatch({
    type: ACCOUNT_SET,
    payload: {
        createErrorMessage
    }
})
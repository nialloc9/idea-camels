import {ACCOUNT_SET} from '../constants/account';
import {getError} from '../../utils/errors';
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
        
        const { data: { token, ...rest } } = await postApi(`account/login`, { email, password, rememberMe });

        payload.token = token;
        payload.data = rest;
        payload.rememberMe = rememberMe;
    } catch (error) {
        payload.fetchErrorMessage = getError(error);
    } finally {
        payload.fetchErrorMessage = '';
        payload.isFetchLoading = false;
        onSetState(payload)
    }
};
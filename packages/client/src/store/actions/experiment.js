import {EXPERIMENT_SET} from '../constants/experiment';
import {postApi} from '../../utils/request';

/**
 * sets the loading state
 * @param payload
 */
const setState = dispatch => payload => dispatch({
    type: EXPERIMENT_SET,
    payload
});

export const onFetch = () => async (dispatch, getState) => {

    const onSetState = setState(dispatch);
    const payload = { isFetchLoading: true, fetchErrorMessage: '' };
    try {
        onSetState(payload);
        
        const { account: { token } } = getState();
        
        const response = await postApi({ uri: `experiment/get-by-account`, token });
        
        const { data: { experiments } } = response
         
        payload.data = experiments;
        payload.fetchErrorMessage = '';
    } catch ({ message }) {
        payload.fetchErrorMessage = message;
    } finally {
        payload.isFetchLoading = false;
        onSetState(payload)
    }
};
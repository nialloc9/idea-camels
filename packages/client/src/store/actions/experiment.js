import {EXPERIMENT_SET} from '../constants/experiment';
import {postApi} from '../../utils/request';
import {deepMerge} from '../../utils/utils';

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
       
        const { account: { token }, experiment: { isFetchInitialised } } = getState();
        
        if(isFetchInitialised) return;

        onSetState(payload);

        const response = await postApi({ uri: `experiment/get-by-account`, token });
        
        const { data: { experiments } } = response
         
        payload.data = experiments;
        payload.fetchErrorMessage = '';
        payload.isFetchInitialised = true;
    } catch ({ message }) {
        payload.fetchErrorMessage = message;
    } finally {
        payload.isFetchLoading = false;
        onSetState(payload)
    }
};

export const onFetchTemplates = () => async (dispatch, getState) => {

    const onSetState = setState(dispatch);
    const payload = { isFetchTemplatesLoading: true, fetchTemplatesErrorMessage: '' };
    try {
        const { account: { token }, experiment: { isFetchTemplatesInitialised } } = getState();

        if(isFetchTemplatesInitialised) return;

        onSetState(payload);
        
        const response = await postApi({ uri: `template/get-with-theme`, token });
        
        const { data: { templates } } = response
         
        payload.templates = templates;
        payload.fetchTemplatesErrorMessage = '';
        payload.isFetchTemplatesInitialised = true;
    } catch ({ message }) {
        payload.fetchTemplatesErrorMessage = message;
    } finally {
        payload.isFetchTemplatesLoading = false;
        onSetState(payload)
    }
};

export const onCreate = ({ content, theme, expiry, name, templateRef, domainRef }) => async (dispatch, getState) => {

    const onSetState = setState(dispatch);
    const payload = { isCreateLoading: true, createErrorMessage: '' };
    try {
        onSetState(payload);
        
        const { account: { token }, experiments: { data } } = getState();
        
        const response = await postApi({ uri: `experiment/create`, token, body: { content, theme, expiry, name, templateRef, domainRef } });
        
        const { data: { experiment } } = response
         
        payload.data = [experiment, ...data];
        payload.createErrorMessage = '';
    } catch ({ message }) {
        payload.createErrorMessage = message;
    } finally {
        payload.isCreateLoading = false;
        onSetState(payload)
    }
};

export const onSetExperiment = newExperiment => (dispatch, getState) => {

    const onSetState = setState(dispatch);

    const { experiment: { experiment } } = getState();
    
    onSetState({ experiment: deepMerge(experiment, newExperiment) })
}

export const onCheckDomainAvailable = domain => async (dispatch, getState) => {
    const onSetState = setState(dispatch);
    const payload = { isCheckDomainLoading: true };
    try {
        onSetState(payload);
        
        const { account: { token } } = getState();
        console.log(1)
        await postApi({ uri: `domain/check-availability`, token, body: { domain } });
        console.log(2)
        payload.isDomainAvailabe = true;
        payload.domain = domain;

    } catch ({ message }) {
        console.log(domain, message)
        payload.isDomainAvailabe = false;
    } finally {
        payload.isCheckDomainLoading = false;
        onSetState(payload)
    }
};
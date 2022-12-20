import { EXPERIMENT_SET } from "../constants/experiment";
import { DOMAIN_SET } from "../constants/domain";
import { postApi } from "../../utils/request";
import {
  deepMerge,
  convertDateToUnix,
  arrayHasDuplicates,
  removeEmptiesFromArray,
} from "../../utils/utils";
import { findThemeAndContent } from "../../templates";
import { handleConversion } from "../../utils/analytics";

/**
 * sets the state
 * @param payload
 */
const setState = (dispatch) => (payload) =>
  dispatch({
    type: EXPERIMENT_SET,
    payload,
  });

/**
 * @description fetchs account experiments
 * @returns
 */
export const onFetch = () => async (dispatch, getState) => {
  const {
    account: { token },
    experiment: { isFetchInitialised, isFetchLoading },
  } = getState();

  // fetch loaded or loading or the customer has not logged in
  if (isFetchInitialised || isFetchLoading || !token) return;

  const onSetState = setState(dispatch);

  onSetState({ isFetchLoading: true, fetchErrorMessage: "" });

  const { data, error } = await postApi({
    uri: `experiment/get-by-account`,
    token,
  });

  if (error) {
    return onSetState({
      isFetchLoading: false,
      fetchErrorMessage: error.message,
    });
  }

  const { experiments } = data;

  onSetState({
    isFetchInitialised: true,
    isFetchLoading: false,
    fetchErrorMessage: "",
    data: experiments,
  });
};

/**
 * @description creates a new experiment for the account
 * @returns
 */
export const onCreate = (callback) => async (dispatch, getState) => {
  const onSetState = setState(dispatch);

  onSetState({ isCreateLoading: true, createErrorMessage: "" });

  const {
    account: { token },
    experiment: {
      data,
      newExperiment: {
        subDomain,
        domain,
        content,
        theme,
        endDate,
        templateRef,
      },
    },
  } = getState();

  let domainRef = null;

  if (!subDomain && domain) {
    const {
      data: domainPurchaseData,
      error: domainPurchaseError,
    } = await postApi({
      uri: `domain/purchase`,
      token,
      body: { domain },
    });

    if (domainPurchaseError) {
      return onSetState({
        isCreateLoading: false,
        createErrorMessage: domainPurchaseError.message,
      });
    }

    if (domainPurchaseData.suggested) {
      dispatch({
        type: DOMAIN_SET,
        payload: {
          suggested: domainPurchaseData.suggested,
        },
      });
      return onSetState({
        isCreateLoading: false,
        createErrorMessage: `${domain} is not available. Please click back and choose a new domain.`,
      });
    }

    domainRef = domainPurchaseData.domain_ref;
  } else {
    const { data: subDomainData, error: subDomainError } = await postApi({
      uri: `domain/create-sub-domain`,
      token,
      body: { subDomain },
    });

    if (subDomainError) {
      return onSetState({
        isCreateLoading: false,
        createErrorMessage: subDomainError.message,
      });
    }

    domainRef = subDomainData.domain_ref;
  }

  const { data: experiment, error } = await postApi({
    uri: `experiment/create`,
    token,
    body: {
      content,
      theme,
      endDate: convertDateToUnix(endDate),
      templateRef,
      domainRef,
    },
  });

  if (error) {
    return onSetState({
      isCreateLoading: false,
      createErrorMessage: error.message,
    });
  }

  onSetState({
    isCreateLoading: false,
    createErrorMessage: "",
    data: [experiment, ...data],
  });

  if (callback) {
    callback(experiment);
  }
};

/**
 * @description prepates new experiment and purchases domain from registrar if not already owned by account
 * @param {*} params
 * @returns
 */
export const onPrepareExperiment = (newData) => async (dispatch, getState) => {
  const onSetState = setState(dispatch);

  const {
    experiment: { newExperiment },
  } = getState();

  const experimentPayload = {
    ...newExperiment,
    ...newData,
  };

  // if no templateRef has been selected before
  if (!experimentPayload.templateRef) {
    experimentPayload.templateRef = 2;
    experimentPayload.themeRef = 1;
  }

  if (experimentPayload.templateRef !== newExperiment.templateRef) {
    const {
      theme: { theme },
      content,
    } = findThemeAndContent({
      templateRef: newData.templateRef || 2,
      themeRef: newData.themeRef || 1,
    });

    experimentPayload.content = content;
    experimentPayload.theme = theme;
  }

  if (
    newData.templateRef &&
    newData.templateRef === newExperiment.templateRef
  ) {
    const {
      theme: { theme },
    } = findThemeAndContent({
      templateRef: newData.templateRef,
      themeRef: newData.themeRef,
    });

    experimentPayload.theme = theme;
  }

  onSetState({
    formIndex: 1,
    newExperiment: experimentPayload,
  }); // formIndex 1 means go to next form
};

/**
 * @description sets formIndex for create experiment
 * @param {*} formIndex
 * @returns
 */
export const onSetFormIndex = (formIndex) => (dispatch) =>
  setState(dispatch)({ formIndex });

/**
 * @description adds to new experiment in experiment reducer
 * @param {*} newExperiment
 * @returns
 */
export const onSetNewExperiment = (expermentDataToAdd) => (
  dispatch,
  getState
) => {
  const onSetState = setState(dispatch);

  const {
    experiment: { newExperiment },
  } = getState();

  onSetState({ newExperiment: deepMerge(newExperiment, expermentDataToAdd) });
};

/**
 * @description sets formIndex for create experiment
 * @param {*} formIndex
 * @returns
 */
export const onResetDomain = () => (dispatch, getState) => {
  const onSetState = setState(dispatch);

  const {
    experiment: { newExperiment },
  } = getState();

  onSetState({
    newExperiment: {
      ...newExperiment,
      domain: undefined,
      subDomain: undefined,
    },
  });
};

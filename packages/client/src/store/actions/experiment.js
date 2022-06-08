import { EXPERIMENT_SET } from "../constants/experiment";
import { DOMAIN_SET } from "../constants/domain";
import { postApi } from "../../utils/request";
import { deepMerge, convertDateToUnix } from "../../utils/utils";
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
    experiment: { isFetchInitialised },
  } = getState();

  if (isFetchInitialised) return;

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
export const onCreate = (experimentToCreate, callback) => async (
  dispatch,
  getState
) => {
  const onSetState = setState(dispatch);

  onSetState({ isCreateLoading: true, createErrorMessage: "" });

  const {
    account: { token },
    experiment: {
      data,
      newExperiment: {
        domain,
        content,
        theme,
        budget,
        endDate,
        templateRef,
        keyword1,
        keyword2,
        keyword3,
        keyword4,
        keyword5,
        keyword6,
        headline,
        headline2,
        description,
      },
    },
  } = getState();

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

  const { data: experiment, error } = await postApi({
    uri: `experiment/create`,
    token,
    body: {
      content,
      theme,
      budget,
      endDate: convertDateToUnix(endDate),
      templateRef,
      domainRef: domainPurchaseData.domain_ref,
      keywords: [keyword1, keyword2, keyword3, keyword4, keyword5, keyword6],
      headline,
      headline2,
      description,
    },
  });

  if (error) {
    return onSetState({
      isCreateLoading: false,
      createErrorMessage: error.message,
    });
  }

  handleConversion({ amount: budget + 10 }); // 10 is an average for domain price

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
export const onPrepareExperiment = ({
  domain,
  themeRef,
  templateRef,
  budget,
  endDate,
  keyword1,
  keyword2,
  keyword3,
  keyword4,
  keyword5,
  keyword6,
  headline,
  headline2,
  description,
}) => async (dispatch, getState) => {
  const onSetState = setState(dispatch);

  const {
    experiment: { newExperiment },
  } = getState();

  const {
    theme: { theme },
    content,
  } = findThemeAndContent({ templateRef, themeRef });

  const experimentPayload = {
    themeRef,
    templateRef,
    domain,
    theme,
    content,
    endDate,
    budget: parseInt(budget),
    keyword1,
    keyword2,
    keyword3,
    keyword4,
    keyword5,
    keyword6,
    headline,
    headline2,
    description,
  };

  onSetState({
    formIndex: 1,
    newExperiment: deepMerge(newExperiment, experimentPayload),
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

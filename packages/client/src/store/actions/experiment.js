import { EXPERIMENT_SET } from "../constants/experiment";
import { DOMAIN_SET } from "../constants/domain";
import { postApi } from "../../utils/request";
import { deepMerge, convertDateToUnix } from "../../utils/utils";
import { findThemeAndContent } from "../../templates";

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
export const onCreate = () => async (dispatch, getState) => {
  const onSetState = setState(dispatch);

  onSetState({ isCreateLoading: true, createErrorMessage: "" });

  const {
    account: { token },
    experiment: {
      data,
      newExperiment: {
        content,
        theme,
        budget,
        endDate,
        templateRef,
        domain,
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

  // const {
  //   data: domainPurchaseData,
  //   error: domainPurchaseError,
  // } = await postApi({
  //   uri: `domain/purchase`,
  //   token,
  //   body: { domain },
  // });

  // if (domainPurchaseError) {
  //   dispatch({
  //     type: DOMAIN_SET,
  //     payload: {
  //       suggested: domainPurchaseError.data.suggested,
  //     },
  //   });
  //   return onSetState({
  //     isCreateLoading: false,
  //     createErrorMessage:
  //       domainPurchaseError.code === 1005
  //         ? `${domain} is not available. Please click back and choose a new domain.`
  //         : domainPurchaseError.message,
  //   });
  // }

  const { data: experiment, error } = await postApi({
    uri: `experiment/create`,
    token,
    body: {
      content,
      theme,
      budget,
      endDate: convertDateToUnix(endDate),
      templateRef,
      domainRef: 1,
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

  onSetState({
    isCreateLoading: false,
    createErrorMessage: "",
    data: [experiment, ...data],
  });
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

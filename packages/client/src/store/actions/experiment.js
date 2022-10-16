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
        headline3,
        description,
        description2,
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
      budget,
      endDate: convertDateToUnix(endDate),
      templateRef,
      domainRef,
      keywords: [keyword1, keyword2, keyword3, keyword4, keyword5, keyword6],
      headline,
      headline2,
      headline3,
      description,
      description2,
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
 * @description checks if array has duplicates
 */
const hasDuplicates = (arr) => {
  const noDups = new Set(arr);

  return arr.length !== noDups.size;
};

/**
 * @description prepates new experiment and purchases domain from registrar if not already owned by account
 * @param {*} params
 * @returns
 */
export const onPrepareExperiment = (newData) => async (dispatch, getState) => {
  const onSetState = setState(dispatch);

  if (hasDuplicates([newData.headline, newData.headline2, newData.headline3])) {
    return {
      headline: "Headlines must be unique",
      headline2: "Headlines must be unique",
      headline3: "Headlines must be unique",
    };
  }

  if (hasDuplicates([newData.description, newData.description2])) {
    return {
      description: "Descriptions must be unique",
      description2: "Descriptions must be unique",
    };
  }

  if (
    hasDuplicates([
      newData.keyword1,
      newData.keyword2,
      newData.keyword3 || "default-value-1",
      newData.keyword4 || "default-value-2",
      newData.keyword5 || "default-value-3",
      newData.keyword6 || "default-value-4",
    ])
  ) {
    return {
      keyword1: "Keywords must be unique",
      keyword2: "Keywords must be unique",
      keyword3: "Keywords must be unique",
      keyword4: "Keywords must be unique",
      keyword5: "Keywords must be unique",
      keyword6: "Keywords must be unique",
    };
  }

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

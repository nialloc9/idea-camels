import { EXPERIMENT_SET } from "../constants/experiment";
import { DOMAIN_SET } from "../constants/domain";
import { postApi } from "../../utils/request";
import { deepMerge } from "../../utils/utils";
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
      newExperiment: { subDomain, domain, content, theme, templateRef },
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
 * @description adds to new experiment in experiment reducer
 * @param {*} newExperiment
 * @returns
 */
export const onSetNewExperiment = (expermentDataToAdd) => (
  dispatch,
  getState
) => {
  const onSetState = setState(dispatch);
  console.log("expermentDataToAdd", expermentDataToAdd);
  const {
    experiment: { newExperiment },
  } = getState();

  const experimentPayload = { ...expermentDataToAdd };

  // changing templateRef
  if (
    (expermentDataToAdd.templateRef &&
      experimentPayload.templateRef !== newExperiment.templateRef) ||
    (expermentDataToAdd.themeRef &&
      experimentPayload.themeRef !== newExperiment.themeRef)
  ) {
    const {
      theme: { theme },
      content,
    } = findThemeAndContent({
      templateRef: expermentDataToAdd.templateRef || newExperiment.templateRef,
      themeRef: expermentDataToAdd.themeRef || 1,
    });

    experimentPayload.content = content;
    experimentPayload.theme = theme;
    experimentPayload.templateRef =
      expermentDataToAdd.templateRef || newExperiment.templateRef;
    experimentPayload.themeRef = expermentDataToAdd.themeRef || 1;
  }

  onSetState({ newExperiment: deepMerge(newExperiment, experimentPayload) });
};

/**
 * @description removes domain and subdomain values
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

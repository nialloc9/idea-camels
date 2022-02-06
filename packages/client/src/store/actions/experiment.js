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
 * sets the state
 * @param payload
 */
const setDomainState = (dispatch) => (payload) =>
  dispatch({
    type: DOMAIN_SET,
    payload,
  });

export const onFetch = () => async (dispatch, getState) => {
  const onSetState = setState(dispatch);
  const payload = { isFetchLoading: true, fetchErrorMessage: "" };
  try {
    const {
      account: { token },
      experiment: { isFetchInitialised },
    } = getState();

    if (isFetchInitialised) return;

    onSetState(payload);

    const response = await postApi({ uri: `experiment/get-by-account`, token });

    const {
      data: { experiments },
    } = response;

    payload.data = experiments;
    payload.fetchErrorMessage = "";
    payload.isFetchInitialised = true;
  } catch ({ message }) {
    payload.fetchErrorMessage = message;
  } finally {
    payload.isFetchLoading = false;
    onSetState(payload);
  }
};

export const onCreate = () => async (dispatch, getState) => {
  const onSetState = setState(dispatch);
  const payload = { isCreateLoading: true, createErrorMessage: "" };
  try {
    onSetState(payload);

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
          domainRef,
        },
      },
    } = getState();

    const response = await postApi({
      uri: `experiment/create`,
      token,
      body: {
        content,
        theme,
        budget,
        endDate: convertDateToUnix(endDate),
        templateRef,
        domainRef,
      },
    });

    const { data: experiment } = response;

    payload.data = [experiment, ...data];
    payload.createErrorMessage = "";
  } catch ({ message }) {
    payload.createErrorMessage = message;
  } finally {
    payload.isCreateLoading = false;
    onSetState(payload);
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
}) => async (dispatch, getState) => {
  const onSetState = setState(dispatch);

  const {
    account: { token },
    domain: { data: domains },
    experiment: { newExperiment },
  } = getState();

  const domainPayload = {
    isDomainAvailable: false,
    domainAvailableErrorMessage: "",
    suggestedDomains: [],
    data: domains,
  };

  const { theme, content } = findThemeAndContent({ templateRef, themeRef });

  const experimentPayload = {
    themeRef,
    templateRef,
    theme,
    content,
    endDate,
    budget: parseInt(budget),
  };

  try {
    const existingDomain = domains.find(({ name }) => name === domain);

    // if does not exist purchase new domain
    if (!existingDomain) {
      const { data } = await postApi({
        uri: `domain/purchase`,
        token,
        body: { domain },
      });

      experimentPayload.domainRef = data.domainRef;
      domainPayload.data = [data, ...domains];
    } else {
      experimentPayload.domainRef = existingDomain.domain_ref;
    }

    onSetState({
      formIndex: 1,
      newExperiment: deepMerge(newExperiment, experimentPayload),
    }); // formIndex 1 means go to next form
  } catch ({ message, suggested }) {
    domainPayload.isDomainAvailable = false;
    domainPayload.suggestedDomains = suggested;
    domainPayload.createErrorMessage = !message.includes("Domain not available")
      ? message
      : "";
  } finally {
    setDomainState(domainPayload);
  }
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

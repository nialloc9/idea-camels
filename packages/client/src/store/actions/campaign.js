import { CAMPAIGN_SET } from "../constants/campaign";
import { EXPERIMENT_SET } from "../constants/experiment";
import { postApi } from "../../utils/request";

/**
 * sets the state
 * @param payload
 */
const setState = (dispatch) => (payload) =>
  dispatch({
    type: CAMPAIGN_SET,
    payload,
  });

/**
 * sets the experiment state
 * @param payload
 */
const setExperimentState = (dispatch) => (payload) =>
  dispatch({
    type: EXPERIMENT_SET,
    payload,
  });
/**
 * @description creates a new experiment for the account
 * @returns
 */
export const onCreate = (
  {
    budget,
    experimentRef,
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
  callback
) => async (dispatch, getState) => {
  const onSetState = setState(dispatch);
  onSetState({
    isCreateLoading: true,
    createErrorMessage: "",
    createSuccessMessage: "",
  });

  const {
    account: { token },
    experiment: { data: experiments },
  } = getState();

  const { data: campaign, error } = await postApi({
    uri: `campaign/create`,
    token,
    body: {
      budget,
      experimentRef,
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
  });

  if (error) {
    return onSetState({
      isCreateLoading: false,
      createErrorMessage: error.message,
    });
  }

  if (!error) {
    onSetState({
      isCreateLoading: false,
      createErrorMessage: "",
      createSuccessMessage:
        "Preparing for launch. Check back in tomorrow to see results.",
      budget: undefined,
      experimentRef: undefined,
      keyword1: undefined,
      keyword2: undefined,
      keyword3: undefined,
      keyword4: undefined,
      keyword5: undefined,
      keyword6: undefined,
      headline: undefined,
      headline2: undefined,
      description: undefined,
    });

    setExperimentState({
      data: experiments.map((o) =>
        experimentRef === campaign.experiment_ref
          ? {
              ...o,
              ...campaign,
            }
          : o
      ),
    });

    callback();
  }
};

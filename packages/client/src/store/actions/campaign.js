import { CAMPAIGN_SET } from "../constants/campaign";
import { EXPERIMENT_SET } from "../constants/experiment";
import { postApi } from "../../utils/request";
import {
  arrayHasDuplicates,
  removeEmptiesFromArray,
  getQueryParameterByName,
  convertDateToUnix,
} from "../../utils/utils";

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
    keywordOptimiser,
    endDate,
  },
  callback
) => async (dispatch, getState) => {
  const experimentRef = getQueryParameterByName("experiment_ref");

  if (
    arrayHasDuplicates(removeEmptiesFromArray([headline, headline2, headline3]))
  ) {
    return {
      headline: "Headlines must be unique.",
      headline2: "Headlines must be unique.",
      headline3: "Headlines must be unique.",
    };
  }

  if (arrayHasDuplicates(removeEmptiesFromArray([description, description2]))) {
    return {
      description: "Descriptions must be unique.",
      description2: "Descriptions must be unique.",
    };
  }

  if (
    arrayHasDuplicates(
      removeEmptiesFromArray([
        keyword1,
        keyword2,
        keyword3,
        keyword4,
        keyword5,
        keyword6,
      ])
    )
  ) {
    return {
      keyword1: "Keywords must be unique.",
      keyword2: "Keywords must be unique.",
      keyword3: "Keywords must be unique.",
      keyword4: "Keywords must be unique.",
      keyword5: "Keywords must be unique.",
      keyword6: "Keywords must be unique.",
    };
  }

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
      keywords: [keyword1, keyword2, keyword3, keyword4, keyword5, keyword6],
      headline,
      headline2,
      headline3,
      description,
      description2,
      endDate: convertDateToUnix(endDate),
      keywordOptimiser: keywordOptimiser ? 1 : 0,
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
      headline3: undefined,
      description: undefined,
      description2: undefined,
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

    return { isSuccess: true };
  }
};

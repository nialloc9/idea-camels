import { EXPERIMENT_SET } from "../constants/experiment";
import { STORE_RESET } from "../constants/store";
import { getCache } from "../../utils/cache";

const initialState = {
  isFetchLoading: false,
  isFetchInitialised: false,
  isFetchTemplatesLoading: false,
  isFetchTemplatesInitialised: false,
  createErrorMessage: "",
  fetchErrorMessage: "",
  fetchTemplatesErrorMessage: "",
  data: [],
  templates: [],
  theme: [],
  newExperiment: {
    budget: undefined,
    endDate: undefined,
    expiry: undefined,
    content: undefined,
    theme: undefined,
    templateRef: undefined,
    themeRef: undefined,
    domain: undefined,
    subDomain: undefined,
    keyword1: undefined,
    keyword2: undefined,
    keyword3: undefined,
    keyword4: undefined,
    keyword5: undefined,
    keyword6: undefined,
    headline: undefined,
    description: undefined,
    price: undefined,
  },
};

const cache = getCache("experiment") || {};

const persistedState = cache ? { ...initialState, ...cache } : initialState;

/**
 * @param state
 * @param type
 * @param payload
 * @returns {*}
 */
const experiment = (state = persistedState, { type, payload }) => {
  const map = {
    [EXPERIMENT_SET]: () =>
      JSON.parse(JSON.stringify({ ...state, ...payload })),
    [STORE_RESET]: () => initialState,
  };

  return map[type] ? map[type]() : state;
};

export default experiment;

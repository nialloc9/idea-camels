import { EXPERIMENT_SET } from "../constants/experiment";
import { STORE_RESET } from "../constants/store";
import { getCache } from "../../utils/cache";

const initialState = {
  formIndex: 0,
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
    name: "",
    expiry: undefined,
    content: undefined,
    theme: undefined,
    templateRef: undefined,
    themeRef: undefined,
    domainRef: undefined,
    imageFiles: {},
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

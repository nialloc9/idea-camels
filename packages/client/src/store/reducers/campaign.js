import { CAMPAIGN_SET } from "../constants/campaign";
import { STORE_RESET } from "../constants/store";
import { getCache } from "../../utils/cache";

const initialState = {
  createErrorMessage: "",
  createSuccessMessage: "",
  budget: undefined,
  experimentRef: undefined,
  keyword1: undefined,
  keyword2: undefined,
  keyword3: undefined,
  keyword4: undefined,
  keyword5: undefined,
  keyword6: undefined,
  headline: undefined,
  description: undefined,
};

const cache = getCache("campaign") || {};

const persistedState = cache ? { ...initialState, ...cache } : initialState;

/**
 * @param state
 * @param type
 * @param payload
 * @returns {*}
 */
const campaign = (state = persistedState, { type, payload }) => {
  const map = {
    [CAMPAIGN_SET]: () => JSON.parse(JSON.stringify({ ...state, ...payload })),
    [STORE_RESET]: () => initialState,
  };

  return map[type] ? map[type]() : state;
};

export default campaign;

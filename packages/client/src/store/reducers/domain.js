import { DOMAIN_SET } from "../constants/domain";
import { STORE_RESET } from "../constants/store";
import { getCache } from "../../utils/cache";

const initialState = {
  isFetchPricesLoading: false,
  isFetchPricesInitialised: false,
  fetchPricesErrorMessage: "",
  prices: [],
};

const cache = getCache("domain") || {};

const persistedState = cache ? { ...initialState, ...cache } : initialState;

/**
 * @param state
 * @param type
 * @param payload
 * @returns {*}
 */
const domain = (state = persistedState, { type, payload }) => {
  const map = {
    [DOMAIN_SET]: () => JSON.parse(JSON.stringify({ ...state, ...payload })),
    [STORE_RESET]: () => initialState,
  };

  return map[type] ? map[type]() : state;
};

export default domain;

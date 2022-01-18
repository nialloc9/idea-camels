import { ACCOUNT_SET, ACCOUNT_RESET } from "../constants/account";
import { STORE_RESET } from "../constants/store";
import { getCookie, decodecookie } from "../../utils/cookie";

const initialState = {
  token: "",
  data: {},
  forgottonPasswordSuccessMessage: "",
};

const cookie = getCookie("account");

const cache = cookie ? decodecookie(cookie) : {};

const persistedState = cache ? { ...initialState, ...cache } : initialState;

/**
 * @param state
 * @param type
 * @param payload
 * @returns {*}
 */
const account = (state = persistedState, { type, payload }) => {
  const map = {
    [ACCOUNT_SET]: () => ({ ...state, ...payload }),
    [ACCOUNT_RESET]: () => ({ ...state }),
    // [STORE_RESET]: () => ({ ...initialState })
  };

  return map[type] ? map[type]() : state;
};

export default account;

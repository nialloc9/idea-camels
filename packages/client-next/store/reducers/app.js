import { APP_SET, APP_RESET } from "../constants/app";
import { STORE_RESET } from "../constants/store";

const initialState = {
  isLoginOpen: false,
};

/**
 * @param state
 * @param type
 * @param payload
 * @returns {*}
 */
const app = (state = initialState, { type, payload }) => {
  const map = {
    [APP_SET]: () => ({ ...state, ...payload }),
    [APP_RESET]: () => ({ ...state }),
    [STORE_RESET]: () => ({ ...state }),
  };

  return map[type] ? map[type]() : state;
};

export default app;

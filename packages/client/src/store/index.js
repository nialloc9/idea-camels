import { createStore, compose } from "redux";
import middleware from "./middleware";
import { history } from "./middleware/history";
import reducers from "./reducers";
import { config } from "../config";
import { setCookie, encodeCookie } from "../utils/cookie";
import { setCache } from "../utils/cache";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers(history), composeEnhancer(middleware));

store.subscribe(() => {
  const {
    account,
    experiment: { newExperiment, formIndex },
  } = store.getState();

  const { token, rememberMe, data, card } = account;

  setCookie(
    "account",
    encodeCookie({ token, rememberMe, data, card }),
    "/",
    rememberMe
      ? config.security.extended_cookie_expiration
      : config.security.default_cookie_expiration
  );

  setCache("experiment", { newExperiment, formIndex });
});

export { Provider, connect } from "react-redux";
export default store;

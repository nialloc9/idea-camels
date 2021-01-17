import { createStore, compose } from "redux";
import middleware from "./middleware";
import { history } from "./middleware/history";
import reducers from "./reducers";
import {config} from "../config";
import { setCookie, encodeCookie } from "../utils/cookie";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers(history), composeEnhancer(middleware));

store.subscribe(() => {
    const { account } = store.getState();

    const { token, rememberMe, data } = account;

    setCookie(
        "account",
        encodeCookie({ token, rememberMe, data }),
        "/",
        rememberMe ? config.security.extended_cookie_expiration : config.security.default_cookie_expiration
    );
});

export { Provider, connect } from 'react-redux'
export default store;

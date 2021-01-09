import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import app from "./app";
import account from "./account";

export default history => combineReducers({
    router: connectRouter(history),
    app,
    account
})
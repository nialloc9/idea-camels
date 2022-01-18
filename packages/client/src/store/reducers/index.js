import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import app from "./app";
import account from "./account";
import experiment from "./experiment";
import domain from "./domain";

export default history => combineReducers({
    router: connectRouter(history),
    app,
    account,
    domain,
    experiment
})
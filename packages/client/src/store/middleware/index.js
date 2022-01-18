import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import history from "./history";
import { config } from "../../config";

let middleware = [thunk, history];

//DEVELOPMENT ONLY
if (!config.isProd) {
  middleware.push(logger);
}

export default applyMiddleware(...middleware);

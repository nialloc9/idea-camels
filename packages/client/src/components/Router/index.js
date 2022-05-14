import { ConnectedRouter } from "connected-react-router";
import { Switch, useLocation } from "react-router-dom";
import OpenRoute from "./OpenRoute";
import PrivateRoute from "./PrivateRoute";
import { config } from "../../config";

const redirect = ({ path }) =>
  window.location.replace(`${config.domainUrl}/${path}`);

export {
  ConnectedRouter as Router,
  Switch,
  OpenRoute,
  PrivateRoute,
  useLocation,
  redirect,
};

import { ConnectedRouter } from "connected-react-router";
import { Switch, useLocation } from "react-router-dom";
import OpenRoute from "./OpenRoute";
import PrivateRoute from "./PrivateRoute";
import { history } from "../../store/middleware/history";

const redirect = ({ path }) => history.push(path);

export {
  ConnectedRouter as Router,
  Switch,
  OpenRoute,
  PrivateRoute,
  useLocation,
  redirect,
};

import { ConnectedRouter } from "connected-react-router";
import { Switch, useLocation, useHistory } from "react-router-dom";
import OpenRoute from "./OpenRoute";
import PrivateRoute from "./PrivateRoute";

const redirect = ({ path }) => {
  const history = useHistory();
  history.push(path);
};

export {
  ConnectedRouter as Router,
  Switch,
  OpenRoute,
  PrivateRoute,
  useLocation,
  redirect,
};

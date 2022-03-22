import React from "react";
import { ThemeProvider } from "./utils/style";

import Footer from "./components/Footer";
import { theme } from "./config";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";
import CreateExperiment from "./pages/CreateExperiment";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";
import Settings from "./pages/Settings";
import PasswordReset from "./pages/PasswordReset";
import store, { Provider } from "./store";
import { history } from "./store/middleware/history";
import { Router, Switch, OpenRoute, PrivateRoute } from "./components/Router";

const routes = [
  {
    path: "/coming-soon",
    component: ComingSoon,
  },
  {
    path: "/home/:experimentId",
    component: Home,
    isAuth: true,
  },
  {
    path: "/home",
    component: Home,
    isAuth: true,
  },
  {
    path: "/create-experiment",
    component: CreateExperiment,
    isAuth: true,
  },
  {
    path: "/settings",
    component: Settings,
    isAuth: true,
  },
  {
    path: "/sign-up",
    component: SignUp,
  },
  {
    path: "/pricing",
    component: Pricing,
  },
  {
    path: "/about-us",
    component: AboutUs,
  },
  {
    path: "/password-reset",
    component: PasswordReset,
  },
  {
    path: "/404",
    component: NotFound,
  },
  {
    path: "/",
    component: Landing,
  },
];

export default () => (
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <Switch>
          {routes.map(({ path, component, isAuth }) =>
            isAuth ? (
              <PrivateRoute key={path} path={path} component={component} />
            ) : (
              <OpenRoute key={path} path={path} component={component} />
            )
          )}
        </Switch>
        <Footer />
      </ThemeProvider>
    </Router>
  </Provider>
);

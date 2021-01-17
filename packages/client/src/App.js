import React from "react";
import { ThemeProvider } from "./utils/style";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { theme } from "./config";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import ComingSoon from "./pages/ComingSoon";
import ExperimentDesign from "./pages/ExperimentDesign";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import store, {Provider} from "./store";
import {history} from "./store/middleware/history";
import { Router, Switch, OpenRoute, PrivateRoute } from './components/Router'

const routes = [
  {
    path: "/coming-soon",
    component: ComingSoon
  },
  {
    path: "/home",
    component: Home,
    isAuth: true
  }
  ,{
    path: "/demo",
    component: Demo
  }
  ,{
    path: "/experiment-design",
    component: ExperimentDesign
  },
  {
    path: "/sign-up",
    component: SignUp
  },
  {
    path: "/404",
    component: NotFound
  },
  {
    path: "/",
    component: Landing
  }
];

export default () => (
  <Provider store={store}>
    <Router history={history}>
    <ThemeProvider theme={theme}>
      <Navigation />
      <Switch>
        {routes.map(({ path, component, isAuth }) => isAuth ? <PrivateRoute key={path} path={path} component={component} /> : <OpenRoute key={path} path={path} component={component} />)}
      </Switch>
      <Footer />
    </ThemeProvider>
  </Router>
  </Provider>
);

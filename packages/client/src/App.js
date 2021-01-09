import React from "react";
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux'
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
import store from "./store";
import {history} from "./store/middleware/history";

export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
    <ThemeProvider theme={theme}>
      <Navigation />
      <Switch>
        <Route path="/coming-soon">
          <ComingSoon />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/demo">
          <Demo />
        </Route>
        <Route path="/experiment-design">
          <ExperimentDesign />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/404">
          <NotFound />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
      <Footer />
    </ThemeProvider>
  </ConnectedRouter>
  </Provider>
);

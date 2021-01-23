import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "./utils/style";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import theme from "./config/theme";
import Landing from "./pages/Landing";
import ComingSoon from "./pages/ComingSoon";

export default () => (
  <Router>
    <ThemeProvider theme={theme}>
      <Navigation />
      <Switch>
        <Route path="/coming-soon">
          <ComingSoon />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
      <Footer />
    </ThemeProvider>
  </Router>
);

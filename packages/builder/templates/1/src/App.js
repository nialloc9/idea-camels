import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "./utils/style";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { theme, content } from "./config";
import Landing from "./pages/Landing";
import ComingSoon from "./pages/ComingSoon";

export default () => (
  <Router>
    <ThemeProvider theme={theme}>
      <Navigation content={content} />
      <Switch>
        <Route path="/coming-soon">
          <ComingSoon content={content} />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
      <Footer content={content} />
    </ThemeProvider>
  </Router>
);

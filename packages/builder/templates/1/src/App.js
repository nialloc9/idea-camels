import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "./utils/style";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import ComingSoon from "./pages/ComingSoon";

import {config, content, theme} from './config'

console.log("============= TEST CONFIG =============");
console.log(config);
console.log("============= TEST CONFIG =============");
console.log("============= TEST CONTENT =============");
console.log(content);
console.log("============= TEST CONTENT =============");
console.log("============= TEST THEME =============");
console.log(theme);
console.log("============= TEST THEME =============");

export default () => (
  <Router>
    <ThemeProvider theme={theme}>
      <Navigation content={content} />
      <Switch>
        <Route path="/coming-soon">
          <ComingSoon content={content} />
        </Route>
        <Route path="/">
          <Landing content={content} />
        </Route>
      </Switch>
      <Footer content={content} />
    </ThemeProvider>
  </Router>
);
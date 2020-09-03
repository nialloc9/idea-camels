import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {ThemeProvider} from "./utils/style"
import Navigation from './components/Navigation'
import {theme} from "./config"
import Home from './pages/home'
import ComingSoon from './pages/coming-soon'

export default () => (
  <Router>
    <ThemeProvider theme={theme}>
    <Navigation />
    <Switch>
      <Route path="/coming-soon">
        <ComingSoon />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
    </ThemeProvider>
    
</Router>
);

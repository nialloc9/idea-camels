import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {ThemeProvider} from "./utils/style"
import Navigation from './components/Navigation'
import {theme} from "./config"
import Landing from './pages/landing'
import Home from './pages/home'
import Demo from './pages/demo'
import ComingSoon from './pages/coming-soon'
import NotFound from './pages/not-found'

export default () => (
  <Router>
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
      <Route path="/404">
        <NotFound />
      </Route>
      <Route path="/">
        <Landing />
      </Route>
    </Switch>
    </ThemeProvider>
    
</Router>
);

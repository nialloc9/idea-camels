import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "./utils/style";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { config } from "./config";
import Landing from "./pages/Landing";
import {Block} from "./components/Styled/Block"
import {Loader} from "./components/Loader"
import ComingSoon from "./pages/ComingSoon";

export default class App extends Component {
  
  state = {
    isLoading: true,
    error: '',
    content: undefined,
    theme: undefined
  }

  async componentDidMount() {
    const newState = { isLoading: false }

    try {
      const theme = await fetch(config.themeUrl, {mode: 'cors', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      } })

      const content = await fetch(config.contentUrl, {mode: 'cors', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      } })

      newState.content = content
      // newState.content = await content.json()
      newState.theme = await theme.json()
    } catch(e) {
      console.error(e)
      newState.error = "An error has occured"
    } finally {
      newState.isLoading = false
      this.setState({ ...this.state, ...newState })
    }
  }
  render() {
    console.log(this.state)
    const { isLoading, error, content, theme } = this.state;

    if(isLoading) {
       return (
        <Block width="100%" height="100%" textAlign="center" theme={{breakpoints: {}}}>
          <Loader
              size="mini"
              inline
              active
          />
        </Block>
       )
    }

    if(error !== "") return <Block theme={{breakpoints: {}}}>{error}</Block>
    
    return (
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
  }
}
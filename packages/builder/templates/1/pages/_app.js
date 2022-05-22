import "semantic-ui-css/semantic.min.css";
import React, { Fragment } from "react";
import { ThemeProvider } from "../utils/style";
import Navigation from "../components/Navigation";
import Head from "../components/Head";
import Footer from "../components/Footer";

import { config, content, theme } from "../config";

console.log("============= TEST CONFIG =============");
console.log(config);
console.log("============= TEST CONFIG =============");
console.log("============= TEST CONTENT =============");
console.log(content);
console.log("============= TEST CONTENT =============");
console.log("============= TEST THEME =============");
console.log(theme);
console.log("============= TEST THEME =============");

const App = ({ Component, pageProps }) => (
  <Fragment>
    <Head />
    <ThemeProvider theme={theme}>
      <Navigation content={content} />
      <Component {...pageProps} content={content} />
      <Footer content={content} />
    </ThemeProvider>
  </Fragment>
);

App.displayName = "App";

export default App;

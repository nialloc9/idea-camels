import "semantic-ui-css/semantic.min.css";
import React, { Fragment } from "react";
import Head from 'next/head'
import { ThemeProvider } from "../utils/style";
import { concatArrayToString } from "../utils/utils";
import Navigation from "../components/Navigation";
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

export default ({ Component, pageProps }) => (
  <Fragment>
    <Head>
        <title>{config.experiment.headline}</title>
        <meta name="description" content={config.experiment.description}></meta>
        <meta name="keywords" content={concatArrayToString({ arr: config.experiment.keywords })}></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    </Head>
    <ThemeProvider theme={theme}>
      <Navigation content={content} />
      <Component {...pageProps} content={content} />
      <Footer content={content} />
    </ThemeProvider>
  </Fragment>
);

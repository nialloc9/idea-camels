import React from "react";
import { ThemeProvider } from "./utils/style";
import Navigation from "./components/Navigation";
import Block1 from "./components/Home/Block1";
import Block2 from "./components/Home/Block2";
import Block3 from "./components/Home/Block3";
import Block4 from "./components/Home/Block4";
import Block5 from "./components/Home/Block5";
import Footer from "./components/Footer";

export default ({ theme, content }) => (
  <ThemeProvider theme={theme}>
      <Navigation content={content} />
        <Block1 content={content}  />
        <Block2 content={content} />
        <Block3 content={content} />
        <Block4 content={content} />
        <Block5 content={content} />
      <Footer content={content} />
    </ThemeProvider>
);

export { content, theme } from './config'
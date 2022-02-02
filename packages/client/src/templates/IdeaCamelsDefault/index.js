import React from "react";
import { ThemeProvider } from "./../../utils/style";
import Navigation from "./components/Navigation";
import Block1 from "./components/Home/Block1";
import Block2 from "./components/Home/Block2";
import Block3 from "./components/Home/Block3";
import Block4 from "./components/Home/Block4";
import Block5 from "./components/Home/Block5";
import Footer from "./components/Footer";
import config from "./config";

const IdeaCamelsDefault = ({ theme, content, onSetExperiment }) => (
  <ThemeProvider theme={theme}>
    <Navigation content={content} onSetExperiment={onSetExperiment} />
    <Block1 content={content} onSetExperiment={onSetExperiment} />
    <Block2 content={content} onSetExperiment={onSetExperiment} />
    <Block3 content={content} onSetExperiment={onSetExperiment} />
    <Block4 content={content} onSetExperiment={onSetExperiment} />
    <Block5 content={content} onSetExperiment={onSetExperiment} />
    <Footer content={content} onSetExperiment={onSetExperiment} />
  </ThemeProvider>
);

const template = [
  {
    ref: config.ref,
    template: IdeaCamelsDefault,
    config: config,
  },
];

export default IdeaCamelsDefault;

export { config, template };

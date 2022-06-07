import React from "react";
import "rc-tabs/assets/index.css";
import "rc-drawer/assets/index.css";
import "./assets/css/react-slick.css";
import { ThemeProvider } from "theme-ui";
import Layout from "./components/layout";
import Banner from "./sections/banner";
import Faq from "./sections/faq";
import Testimonials from "./sections/testimonials";
import Security from "./sections/security";
import Addons from "./sections/addons";
import MobileApp from "./sections/mobile-app";
import Dashboard from "./sections/dashboard";
import UltimateFeatures from "./sections/ultimate-features";
import config from "./config";

const CRM = ({ theme, content, onSetExperiment }) => (
  <ThemeProvider theme={theme}>
    <Layout content={content} onSetExperiment={onSetExperiment}>
      <Banner content={content} onSetExperiment={onSetExperiment} />
      <Testimonials content={content} onSetExperiment={onSetExperiment} />
      <Security content={content} onSetExperiment={onSetExperiment} />
      <Addons content={content} onSetExperiment={onSetExperiment} />
      <Dashboard content={content} onSetExperiment={onSetExperiment} />
      <UltimateFeatures content={content} onSetExperiment={onSetExperiment} />
      <MobileApp content={content} theme={theme} />
      <Faq content={content} theme={theme} onSetExperiment={onSetExperiment} />
    </Layout>
  </ThemeProvider>
);

const template = [
  {
    ref: config.ref,
    template: CRM,
    config: config,
  },
];

export default CRM;

export { config, template };

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

const CRM = ({ theme, content, onSetExperiment }) => {
  const onSetContent = (newContent) => onSetExperiment({ content: newContent });

  return (
    <ThemeProvider theme={theme}>
      <Layout content={content} onSetContent={onSetContent}>
        <Banner content={content} onSetContent={onSetContent} />
        <Testimonials content={content} onSetContent={onSetContent} />
        <Security content={content} onSetContent={onSetContent} />
        <Addons content={content} onSetContent={onSetContent} />
        <Dashboard content={content} onSetContent={onSetContent} />
        <UltimateFeatures content={content} onSetContent={onSetContent} />
        <MobileApp
          content={content}
          theme={theme}
          onSetContent={onSetContent}
        />
        <Faq content={content} theme={theme} onSetContent={onSetContent} />
      </Layout>
    </ThemeProvider>
  );
};

const template = [
  {
    ref: config.ref,
    template: CRM,
    config: config,
  },
];

export default CRM;

export { config, template };

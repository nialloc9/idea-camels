import Analytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";
import { hotjar } from "react-hotjar";
import { config } from "../config";
import { logger } from "../utils/utils";

/**
 * RULES
 * action for element + action e.g home-page-image-click
 * additional information such as url, button text, form field name, or buttion text e.g firstname
 * https://mixedanalytics.com/blog/event-tracking-naming-strategy-for-google-analytics/#:~:text=EVENT%20LABEL%20NAMING,text%2C%20scroll%20percent%2C%20etc.
 */

const analytics = Analytics({
  app: "idea-camels",
  plugins: [
    googleAnalytics({
      trackingId: "UA-173719058-1",
    }),
  ],
});

analytics.plugins.enable("google");

if (config.isProd) {
  hotjar.initialize(config.hotjar.id, config.hotjar.version);
} else {
  logger.info("SIMULATED HOTJAR INITIALIZATION");
}

/**
 * handles events
 * @param {string} action
 * @param {string} label
 */
export const handleEvent = async (action, label) => {
  const {
    location: { pathname },
  } = document;

  const ec = pathname.split("/")[1];

  const options = {
    category: ec === "" ? "landing" : ec,
    label: label,
  };

  if (config.isProd) {
    return await analytics.track(action, options);
  }

  logger.info("SIMULATED GA EVENT", options);
};

/**
 * @description handles a page view
 */
export const handlePageView = () => {
  if (config.isProd) return analytics.page();

  logger.info("SIMULATED GA PAGE VIEW");
};

/**
 * @description handles a page view
 */
export const handleIdentify = (id) => {
  if (config.isProd) {
    logger.info("CUSTOMER FOUND", { id });
    analytics.identify(`${id}`);
    return hotjar.identify(`${id}`, {});
  }

  logger.info("SIMULATED GA IDENTIFY");
};

import Analytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";
import { hotjar } from "react-hotjar";
import { config } from "../config";
import { logger } from "../utils/utils";

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
    // value: action,
    label: label,
  };

  if (config.isProd) {
    return await analytics.track(action, options, (a) => console.log(a));
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
    return analytics.identify(`${id}`);
  }

  logger.info("SIMULATED GA IDENTIFY");
};

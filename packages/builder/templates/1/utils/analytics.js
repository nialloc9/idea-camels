import { config } from "../config";
import { logger } from "../utils/utils";

const analytics = {
  track: (action, options) => logger.info("ANALYTICS", action, options),
  page: () => logger.info("ANALYTICS - PAGE_VIEW"),
};
/**
 * handles events
 * @param {string} action
 * @param {string} label
 */
export const handleEvent = (action, label) => {
  const {
    location: { pathname },
  } = document;

  const ec = pathname.split("/")[1];

  const options = {
    category: ec === "" ? "landing" : ec,
    value: action,
    label: label,
  };

  if (config.isProd) {
    return analytics.track(action, options);
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

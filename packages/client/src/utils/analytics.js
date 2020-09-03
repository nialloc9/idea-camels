import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'
import {config} from "../config";

const analytics = Analytics({
    app: 'idea-camels',
    plugins: [
      googleAnalytics({
        trackingId: config.ga.uaId
      })
    ]
  })

/**
 * handles events
 * @param {string} action
 * @param {string} label
 */
export const handleEvent = (action, label) => {
    const {
        location: { pathname }
    } = document;

    const ec = pathname.split("/")[1];

    const options = {
        category: ec === "" ? "landing" : ec,
        value: action,
        label: label
    };

    if(config.isProd) {
        return analytics.track(action, options);
    }
    
    console.log(options);
};

/**
 * @description handles a page view
 */
export const handlePageView = () => {

    if(config.isProd) return analytics.page();

    console.log("GOOGLE ANALYTICS --- PAGE VIEW")
}
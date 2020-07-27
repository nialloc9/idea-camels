import ua from "universal-analytics";
import {config} from "config";

const visitor = ua(config.ga.uaId, { http: false });

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
    console.log({
        ec: ec === "" ? "landing" : ec,
                ea: action,
                el: label
    })
    visitor
        .event({
            ec: ec === "" ? "landing" : ec,
            ea: action,
            el: label
        })
        .send();
};
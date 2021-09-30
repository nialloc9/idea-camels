const { REACT_APP_ENV } = process.env;

const {
    location: { pathname },
} = window;

const localhost = {
    env: REACT_APP_ENV,
    isProd: REACT_APP_ENV === "production",
    pathname,
    social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
    },
    ga: {
        uaId: "UA-173719058-1",
    },
    hotjar: {
        id: 1710788,
        version: 6,
    },
    api: {
        base: 'http://localhost:3001',
    },
    security: {
        default_cookie_expiration: null,
        extended_cookie_expiration: 30
    }
};

const staging = { ...localhost };
const production = { ...staging, api: { ...staging.api, base: "https://v1xwkm07ta.execute-api.eu-west-1.amazonaws.com/prod" } };

export default {
    staging,
    production
}[REACT_APP_ENV] || localhost;

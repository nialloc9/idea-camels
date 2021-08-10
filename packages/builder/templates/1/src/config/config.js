const { NODE_ENV, EXPERIMENT_REF } = process.env;

const {
    location: { pathname },
} = window;

export default {
    env: NODE_ENV,
    experimentRef: EXPERIMENT_REF,
    isProd: NODE_ENV === "production",
    pathname,
    social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
    },
    ga: {
        uaId: "UA-173719058-1",
    },
    themeUrl: "https://prod-themes.s3.eu-west-1.amazonaws.com/themes/wg34e9h2zd.json",
    contentUrl: "https://prod-themes.s3.eu-west-1.amazonaws.com/contents/wg34e9h2zd.json"
};

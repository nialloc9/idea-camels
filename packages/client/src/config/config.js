const { NODE_ENV } = process.env;

const { location: { pathname } } = window;

export default {
    env: NODE_ENV,
    isProd: NODE_ENV === "production",
    pathname,
    social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
    },
    ga: {
        uaId: "UA-173719058-1"
    }
}
import content from "./content";
import theme from "./theme";

export default {
    env: "prod",
    isProd: true,
    social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
    },
    ga: {
        uaId: "UA-173719058-1",
    },
    themeUrl: "https://prod-themes.s3.eu-west-1.amazonaws.com/themes/wg34e9h2zd.json",
    contentUrl: "https://prod-themes.s3.eu-west-1.amazonaws.com/contents/wg34e9h2zd.json",
    theme, 
    content
};

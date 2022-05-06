export default {
  env: "prod",
  isProd: true,
  api: {
    base: process.env.API_BASE_URL,
    token: process.env.API_TOKEN
  },
  experiment: {
    ref: process.env.EXPERIMENT_REF,
    themeKey: process.env.THEME_KEY,
    contentKey: process.env.CONTENT_KEY,
    description: process.env.DESCRIPTION,
    headline: process.env.HEADLINE,
    keywords: [process.env.KEYWORD_0, process.env.KEYWORD_1, process.env.KEYWORD_2, process.env.KEYWORD_3, process.env.KEYWORD_4, process.env.KEYWORD_5]
  }
};
import config from "../config";
import theme from "../theme.json";
import content from "../content.json";

describe("template 1 configs", () => {
  it("template contents.json are correct", () => {
    expect(typeof content.logo.image.src).toBe("string");
    expect(typeof content.banner.image.src).toBe("string");
    expect(typeof content.dashboard.title).toBe("string");
    expect(typeof content.addons.title).toBe("string");
  });

  it("template theme.json are correct", () => {
    expect(typeof theme.banner.backgroundColor).toBe("string");
    expect(typeof theme.testimonials.button.backgroundRepeat).toBe("string");
    expect(typeof theme.colors.text).toBe("string");
    expect(typeof theme.styles.root.fontFamily).toBe("string");
  });

  it("template config.js are correct", () => {
    expect(config.env).toBe("prod");
    expect(config.isProd).toBe(true);
    // expect(config.experiment.headline.length <= 30).toBe(true);
    // expect(config.experiment.headline2.length <= 30).toBe(true);
  });
});

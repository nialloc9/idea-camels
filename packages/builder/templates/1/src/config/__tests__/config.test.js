import config from "../config";
import theme from "../theme.json";
import content from "../content.json";

describe("template 1 configs", () => {
  it("template contents.json are correct", () => {
    expect(typeof content.block1.logo.src).toBe("string");
    expect(typeof content.block2.image.src).toBe("string");
    expect(typeof content.block3.heading.text).toBe("string");
    expect(typeof content.block4.card.image.src).toBe("string");
  });

  it("template theme.json are correct", () => {
    expect(typeof theme.block1.backgroundColor).toBe("string");
    expect(typeof theme.block2.backgroundRepeat).toBe("string");
    expect(typeof theme.block3.backgroundColor).toBe("string");
    expect(typeof theme.block4.backgroundColor).toBe("string");
  });

  it("template config.js are correct", () => {
    expect(config.env).toBe("prod");
    expect(config.isProd).toBe(true);
    expect(config.experiment.headline.length <= 30).toBe(true);
    expect(config.experiment.headline2.length <= 30).toBe(true);
  });
});

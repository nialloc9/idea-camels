import content from "../content.json";
import defaultTheme from "../theme1.json";
import themeTwo from "../themeTwo.json";

describe("check content, config, and themes are valid", () => {
  it("themes are valid JSON", () => {
    expect(
      [content, defaultTheme, themeTwo].forEach((o) => JSON.parse(o))
    ).not.toThrowError();
  });
});

import content from "../content.json";
import theme1 from "../theme1.json";
import theme2 from "../theme2.json";

describe("check content, config, and themes are valid", () => {
  it("themes are valid JSON", () => {
    expect(
      [content, theme1, theme2].forEach((o) => JSON.parse(o))
    ).not.toThrowError();
  });
});

import content from "../content.json";
import theme1 from "../theme1.json";
import theme2 from "../theme2.json";

describe("check content, config, and themes are valid", () => {
  it("themes are valid JSON", () => {
    [content, theme1, theme2].forEach(
      (o) => console.log(o) || JSON.parse(JSON.stringify(o))
    );
  });
});

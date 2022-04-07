import { findTemplate, findThemeAndContent } from "../";

describe("templates test suite", () => {
  it("find correct template", () => {
    expect(findTemplate(1).config.name).toEqual("Idea Camels Default");
    expect(findTemplate(1).ref).toEqual(1);
  });

  it("find correct theme and content", () => {
    expect(
      findThemeAndContent({ templateRef: 1, themeRef: 1 }).theme.name
    ).toEqual("Idea Camels Default");
    expect(
      findThemeAndContent({ templateRef: 1, themeRef: 1 }).theme.ref
    ).toEqual(1);
  });
});

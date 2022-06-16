import { remCalc, createMediaQuery, getMarginsOrPaddings } from "../style";

describe("style utils test suite", () => {
  it("remCalc works correctly", () => {
    expect(remCalc(16)).toEqual("1.0000rem");
    expect(remCalc(32)).toEqual("2.0000rem");
  });

  it("createMediaQuery works correctly", () => {
    expect(createMediaQuery(16)).toEqual("@media (min-width: 16px)");
  });

  it("getMarginsOrPaddings works correctly", () => {
    expect(getMarginsOrPaddings("16 32 48 64")).toEqual(
      "1.0000rem  2.0000rem  3.0000rem  4.0000rem "
    );
    expect(getMarginsOrPaddings([16, 32, 48, 64])).toEqual(
      "1.0000rem 2.0000rem 3.0000rem 4.0000rem"
    );
  });
});

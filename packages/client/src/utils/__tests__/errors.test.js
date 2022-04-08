import { getError } from "../errors";

describe("error utils test suite", () => {
  it("returns correct error", () => {
    expect(getError({ coe: 1000 })).toEqual("Email already in use.");
    expect(getError({ coe: 1002 })).toEqual("Account not found.");
    expect(getError({ coe: 1005 })).toEqual("Domain not available.");
    expect(getError({ coe: 0101 })).toEqual(
      "An error has occured. Please reload your browser. Code: 0101."
    );
    expect(getError({})).toEqual(
      "An error has occured. Please reload your browser. Code: 500."
    );
  });
});

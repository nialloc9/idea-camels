import { getError } from "../errors";

describe("error utils test suite", () => {
  it("returns correct error", () => {
    expect(getError({ code: 1000 })).toEqual("Email already in use.");
    expect(getError({ code: 1002 })).toEqual("Account not found.");
    expect(getError({ code: 1005 })).toEqual("Domain not available.");
    expect(getError({ code: 743759435 })).toEqual(
      "An error has occured. Please reload your browser. Code: 743759435."
    );
    expect(getError({})).toEqual(
      "An error has occured. Please reload your browser. Code: 500."
    );
  });
});

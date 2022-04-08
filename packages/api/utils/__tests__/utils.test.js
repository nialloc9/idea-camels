import { handleSuccess } from "../utils";

describe("api utils test suite", () => {
  it("handleSuccess works correctly", () => {
    expect(handleSuccess("test", { test: "test" })).toEqual({
      code: 200,
      message: "test",
      data: { test: "test" },
    });
    expect(handleSuccess("test", { test: "test" })).toEqual({
      code: 200,
      message: "test",
      data: {},
      scrub: ["test"],
    });
  });
});

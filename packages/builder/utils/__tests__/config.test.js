const config = require("../config");

const { NODE_ENV } = process.env;

describe("prod builder config test suite", () => {
  it("config works correctly", () => {
    if (NODE_ENV === "production") {
      expect(config.noInternet).toEqual(false);
      expect(config.isProd).toEqual(true);
    }
  });
});

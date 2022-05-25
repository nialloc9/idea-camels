const config = require("../config");

const { NODE_ENV } = process.env;

describe("prod api config test suite", () => {
  it("config works correctly", () => {
    if (NODE_ENV === "production") {
      expect(config.noInternet).toEqual(false);
      expect(config.isProd).toEqual(true);
      expect(config.security.whitelist.includes("https://ideacamels.com")).toEqual(true);
      expect(config.security.whitelist.includes("http://ideacamels.com")).toEqual(true);
    }
  });
});

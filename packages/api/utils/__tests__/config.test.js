const config = require("../config");

describe("prod api config test suite", () => {
  it("config works correctly", () => {
    if (config.isProd) {
      expect(config.noInternet).toEqual(false);
      expect(config.isProd).toEqual(true);
      expect(
        config.security.whitelist.includes("https://ideacamels.com")
      ).toEqual(true);
      expect(
        config.security.whitelist.includes("http://ideacamels.com")
      ).toEqual(true);
    }
  });
});

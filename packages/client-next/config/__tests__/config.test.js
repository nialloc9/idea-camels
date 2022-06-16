const config = require("../config");

const { NODE_ENV } = process.env;

describe("prod client config test suite", () => {
  it("config works correctly", () => {
    if (NODE_ENV === "production") {
      expect(config.isProd).toEqual(true);
      expect([config.payments.publishableKey.includes("test")]).toEqual(false);
      expect(!!config.payments.publishableKey).toEqual(true);
    }
  });
});

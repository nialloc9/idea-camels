const {
  jwtVerify,
  createJwToken,
  requiredParam,
  scrubAccount,
} = require("../security");

const { NODE_ENV } = process.env;

describe("security test suite", () => {
  it("jwtVerify works correctly", () => {
    const provider = { verify: (token, secret) => [token, secret] };

    expect(
      jwtVerify({ token: "test", secret: "testSecret" }, { provider })
    ).toEqual([null, ["test", "testSecret"]]);
  });

  it("createJwToken works correctly", () => {
    const provider = { sign: (payload, secret) => "test" };

    expect(
      createJwToken(
        { data: "test", expiry: "1d", secret: "testSecret" },
        { provider }
      )
    ).toEqual("test");
  });

  it("requiredParam works correctly", async () => {
    await requiredParam({
      serviceName: "test",
      paramName: "test",
      param: "test",
      caller: "test",
    });

    const missingParamError = {
      message: "required param missing",
      code: 2003,
      endpoint: undefined,
      service: "test",
      dataLayer: undefined,
      caller: "test",
      reason: undefined,
      data: { test: "undefined" },
    };

    try {
      await requiredParam({
        serviceName: "test",
        paramName: "test",
        param: undefined,
        caller: "test",
      });
    } catch (error) {
      expect(error).toEqual(missingParamError);
    }

    try {
      await requiredParam({
        serviceName: "test",
        paramName: "test",
        param: 0,
        caller: "test",
      });
    } catch (error) {
      expect(error).toEqual(missingParamError);
    }

    try {
      await requiredParam({
        serviceName: "test",
        paramName: "test",
        param: null,
        caller: "test",
      });
    } catch (error) {
      expect(error).toEqual(missingParamError);
    }

    try {
      await requiredParam({
        serviceName: "test",
        paramName: "test",
        param: "",
        caller: "test",
      });
    } catch (error) {
      expect(error).toEqual(missingParamError);
    }
  });

  it("scrubAccount works correctly", () => {
    expect(scrubAccount({ test: "test", test1: "test1" }, ["test1"])).toEqual({
      test: "test",
    });
  });
});

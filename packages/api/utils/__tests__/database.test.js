const { getConnection, query } = require("../database");

describe("prod api database test suite", () => {
  it("getConnection works correctly", async () => {
    expect(
      await getConnection(
        { caller: "test" },
        {
          databasePool: {
            getConnection: (func) => func(undefined, "test"),
          },
        }
      )
    ).toEqual("test");

    try {
      await getConnection(
        { caller: "test" },
        {
          databasePool: {
            getConnection: (func) => func("testError"),
          },
        }
      );
    } catch (error) {
      expect(error).toEqual({
        message: "could not connect to database",
        code: 4000,
        endpoint: undefined,
        service: undefined,
        dataLayer: undefined,
        caller: "test",
        reason: undefined,
        data: {
          error: "testError",
        },
      });
    }
  });

  it("query works correctly", () => {
    query("SELECT * FROM test", { test: "test" }, "test", "test", {
      query: () => "test",
      release: () => {},
    });
  });
});

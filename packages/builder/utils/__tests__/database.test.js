const { query } = require("../database");

describe("database utils test suite", () => {
  it("query should run", () => {
    const connectionQuery = jest.mock();
    const queryString = "SELECT * from accounts WHERE account_ref = ?";
    const queryData = { account_ref: 1 };
    expect(
      query(
        queryString,
        queryData,
        "ACCOUNTS",
        { query: connectionQuery },
        expect.anything()
      )
    ).toHaveBeenCalledWith(queryString, queryData);
  });
});

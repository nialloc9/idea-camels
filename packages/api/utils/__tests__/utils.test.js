const {
  handleSuccess,
  convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase,
  uppercaseSentenceWords,
  changeKeys,
  reverseObjectKeyValues,
} = require("../utils");

describe("api utils test suite", () => {
  it("handleSuccess works correctly", () => {
    expect(handleSuccess("test", { test: "test" })).toEqual({
      code: 200,
      message: "test",
      data: { test: "test" },
    });
    expect(handleSuccess("test", { test: "test" }, ["test"])).toEqual({
      code: 200,
      message: "test",
      data: {},
    });
  });

  it("convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase works correctly", () => {
    expect(
      convertArrayToObjectWithKeysCamelCaseAndValueSnakeCase([
        "test_key",
        "second_test_key",
      ])
    ).toEqual({
      testKey: "test_key",
      secondTestKey: "second_test_key",
    });
  });

  it("uppercaseSentenceWords works correctly", () => {
    expect(uppercaseSentenceWords("this is a test")).toEqual("This Is A Test");
  });

  it("changeKeys works correctly", () => {
    expect(
      changeKeys({ test1: "value", test2: "value2" }, { test1: "newTest1" })
    ).toEqual({
      newTest1: "value",
      test2: "value2",
    });
  });

  it("reverseObjectKeyValues works correctly", () => {
    expect(reverseObjectKeyValues({ test1: "value", test2: "value2" })).toEqual(
      {
        value: "test1",
        value2: "test2",
      }
    );
  });
});

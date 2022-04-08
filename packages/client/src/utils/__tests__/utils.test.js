import { withEnterKey, toTitleCase } from "../utils";

describe("root utils test suite", () => {
  it("enter key pressed", () => {
    const callback = jest.fn();
    const preventDefault = () => {};
    withEnterKey(
      "test",
      callback
    )({ key: "Enter", shiftKey: false, preventDefault });
    expect(callback).toHaveBeenCalled();
    expect(preventDefault).toHaveBeenCalled();
  });

  it("uppercases all words in sentence", () => {
    expect(toTitleCase("hello world")).toEqual("Hello World");
    expect(toTitleCase("helloworld")).toEqual("Helloworld");
  });
});

import { configureErrorResponse, configureSuccessResponse } from "../request";

describe("request utils test suite", () => {
  it("should return correct error response in development", () => {
    expect(
      configureErrorResponse({
        error: {
          response: {
            data: {
              message: "test",
              data: "test",
              code: "test",
            },
          },
        },
        config: { env: "development" },
      })
    ).toEqual({
      message: "test",
      data: "test",
      code: "test",
    });

    expect(
      configureErrorResponse({
        error: {
          response: {
            data: {
              data: "test",
              code: "test",
            },
          },
        },
        config: { env: "development" },
      })
    ).toEqual({
      message: "An error has occured. Please try again.",
      data: "test",
      code: "test",
    });
  });

  it("should return correct error response when not in development", () => {
    expect(
      configureErrorResponse({
        error: {
          response: {
            data: {
              error: "test",
              data: "test",
              code: "test",
            },
          },
        },
        config: { env: "prod" },
      })
    ).toEqual({
      message: "test",
      data: "test",
      code: "test",
    });

    expect(
      configureErrorResponse({
        error: {
          response: {
            data: {
              data: "test",
              code: "test",
            },
          },
        },
        config: { env: "prod" },
      })
    ).toEqual({
      message: "An error has occured. Please try again.",
      data: "test",
      code: "test",
    });
  });

  it("should return correct success response when not in development", () => {
    expect(
      configureSuccessResponse({
        response: {
          data: "test",
        },
        config: { env: "development" },
      })
    ).toEqual("test");

    expect(
      configureSuccessResponse({
        response: {
          data: {
            payload: "test",
          },
        },
        config: { env: "prod" },
      })
    ).toEqual("test");
  });
});

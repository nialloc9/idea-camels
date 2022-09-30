const {
  getCard,
  updateCustomer,
  chargeCustomer,
  getCustomer,
  createCustomer,
} = require("../stripe");

describe("api stripe test suite", () => {
  it("getCard works correctly", async () => {
    const payload = { customerId: 1, cardId: 2 };
    const mockFunc = (customerId, cardId) => ({ customerId, cardId });

    expect(
      await getCard(payload, {
        config: {
          noInternet: false,
        },
        provider: { customers: { retrieveSource: mockFunc } },
      })
    ).toEqual({
      card: payload,
    });
  });

  it("updateCustomer works correctly", async () => {
    const payload = {
      accountRef: 1,
      customerId: 1,
      name: "test",
      email: "test@test.com",
      phone: "84378953978",
      caller: "test",
      description: "test",
      source: "test",
    };
    const mockFunc = (customerId, data) => data;

    expect(
      await updateCustomer(payload, {
        config: {
          noInternet: false,
        },
        provider: { customers: { update: mockFunc } },
      })
    ).toEqual({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      description: payload.description,
      source: payload.source,
      metadata: {
        last_updated_by_caller: payload.caller,
        account_ref: payload.accountRef,
      },
    });
  });

  it("chargeCustomer works correctly", async () => {
    const payload = {
      customerId: 1,
      amount: 1,
      currency: "USD",
      accountRef: 1,
      caller: "test",
      description: "test",
    };
    const mockFunc = (data) => data;

    expect(
      await chargeCustomer(payload, {
        config: {
          noInternet: false,
        },
        provider: { charges: { create: mockFunc } },
      })
    ).toEqual({
      customer: payload.customerId,
      amount: payload.amount * 100,
      currency: payload.currency,
      description: payload.description,
      metadata: {
        last_charged_by_caller: payload.caller,
        account_ref: payload.accountRef,
      },
    });
  });

  it("getCustomer works correctly", async () => {
    const payload = {
      customerId: 1,
    };
    const mockFunc = (customerId) => ({ customerId });

    expect(
      await getCustomer(payload, {
        config: {
          noInternet: false,
        },
        provider: { customers: { retrieve: mockFunc } },
      })
    ).toEqual({
      customerId: payload.customerId,
    });
  });

  it("createCustomer works correctly", async () => {
    const payload = {
      name: "test",
      email: "test@test.com",
      phone: "32423435",
      caller: "test",
      description: "test",
    };
    const mockFunc = (data) => data;

    expect(
      await createCustomer(payload, {
        config: {
          noInternet: false,
        },
        provider: { customers: { create: mockFunc } },
      })
    ).toEqual({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      description: payload.description,
      metadata: {
        created_by_caller: payload.caller,
      },
    });
  });
});

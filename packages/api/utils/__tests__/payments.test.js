const {
  calculateAdBudgetMinusMarkup,
  getDomainPriceWithMarkUp,
  calculateDomainPrice,
} = require("../payments");

describe("prod api payments test suite", () => {
  it("calculateDomainPrice works correctly", () => {
    expect(
      calculateDomainPrice({
        domain: "test@test.com",
        domainPrices: [
          { name: ".com", price: 10 },
          { name: ".co.uk", price: 20 },
        ],
      })
    ).toEqual(10);
  });

  it("getDomainPriceWithMarkUp works correctly", () => {
    expect(
      getDomainPriceWithMarkUp({ price: 100, domainPercentageMarkUp: 5 })
    ).toEqual(105);

    expect(
      getDomainPriceWithMarkUp({ price: 99, domainPercentageMarkUp: 4 })
    ).toEqual(103);
  });

  it("getDomainPriceWithMarkUp works correctly", () => {
    expect(
      getDomainPriceWithMarkUp({ price: 100, domainPercentageMarkUp: 5 })
    ).toEqual(105);

    expect(
      getDomainPriceWithMarkUp({ price: 99, domainPercentageMarkUp: 4 })
    ).toEqual(103);
  });

  it("calculateAdBudgetMinusMarkup works correctly", () => {
    expect(
      calculateAdBudgetMinusMarkup({ budget: 100, advertPercentageMarkup: 5 })
    ).toEqual(95);

    expect(
      calculateAdBudgetMinusMarkup({ budget: "100", advertPercentageMarkup: 5 })
    ).toEqual(95);
  });
});

import { calculateTotalExperimentPrice } from "../payments";

describe("payments test suite", () => {
  it("calculates experiment price", () => {
    const domainPrices = [
      { name: ".com", price: 10 },
      { name: ".co.uk", price: 0 },
    ];

    expect(
      calculateTotalExperimentPrice({
        domain: "ideacamels.com",
        domainPrices,
        budget: 10,
      })
    ).toEqual(20);

    expect(
      calculateTotalExperimentPrice({
        domain: "ideacamels.co.uk",
        domainPrices,
        budget: 10,
      })
    ).toEqual(10);
  });
});

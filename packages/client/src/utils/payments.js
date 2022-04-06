import { config } from "../config";

/**
 * @description Calculates cost of domain
 * @param {*} param0
 * @returns
 */
export const calculateDomainPrice = ({ domain, domainPrices }) => {
  if (!domain || domainPrices.length === 0) return 0;

  const domainPrice = domainPrices.find(({ name }) => domain.includes(name));
  if (!domainPrice) return 0;
  return domainPrice.price;
};

/**
 * @description Calculates total cost of experiment
 * @param {*} param0
 * @returns
 */
export const calculateTotalExperimentPrice = ({
  domain,
  domainPrices,
  budget,
}) => {
  const domainPrice = calculateDomainPrice({ domain, domainPrices });

  return (
    config.payments.serviceCharge +
    (parseInt(domainPrice) || 0) +
    (parseInt(budget) || 0)
  );
};

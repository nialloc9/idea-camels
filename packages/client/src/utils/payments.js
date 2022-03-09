import { config } from "../config";

/**
 * @description Calculates cost of domain
 * @param {*} param0
 * @returns
 */
export const calculateDomainPrice = ({ domain, domains, domainPrices }) => {
  const isDomainAlreadyOwned = domains.find(({ name }) => name === domain)
    ? true
    : false;

  if (!domain || isDomainAlreadyOwned) return 0;

  const { price } = domainPrices.find(({ name }) => domain.includes(name));

  return price;
};

/**
 * @description Calculates total cost of experiment
 * @param {*} param0
 * @returns
 */
export const calculateTotalExperimentPrice = ({
  domain,
  domains,
  domainPrices,
  budget,
}) => {
  const domainPrice = calculateDomainPrice({ domain, domains, domainPrices });

  return (
    config.payments.serviceCharge +
    (parseInt(domainPrice) || 0) +
    (parseInt(budget) || 0)
  );
};

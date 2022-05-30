import { config } from "../config";

const getTopDomain = (domain) => {
  const topDomainExpression =
    /\w+((\.[a-z]{2,3})(\.(ad|ae|af|ag|ai|al|am|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bl|bm|bn|bo|bq|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mf|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw))?)$/i;
  const match = topDomainExpression.exec(domain);

  return match && match[1];
};

/**
 * @description Calculates cost of domain
 * @param {*} param0
 * @returns
 */
export const calculateDomainPrice = ({ domain, domainPrices }) => {
  if (!domain || domainPrices.length === 0) return 0;

  const topLevelDomain = getTopDomain(domain);

  const domainPrice = domainPrices.find(
    ({ name }) => topLevelDomain === `.${name}`
  );

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

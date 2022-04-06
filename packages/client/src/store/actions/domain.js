import { DOMAIN_SET } from "../constants/domain";
import { postApi } from "../../utils/request";

/**
 * sets the state
 * @param payload
 */
const setState = (dispatch) => (payload) =>
  dispatch({
    type: DOMAIN_SET,
    payload,
  });

/**
 * @description fetches domain prices
 * @returns
 */
export const onFetchDomainPrices = () => async (dispatch, getState) => {
  const onSetState = setState(dispatch);

  const {
    account: { token },
    domain: { isFetchPricesLoading },
  } = getState();

  if (isFetchPricesLoading) return;

  onSetState({
    isFetchPricesLoading: true,
    fetchPricesErrorMessage: "",
    prices: [],
  });

  const { error, data } = await postApi({ uri: `domain/get-prices`, token });

  if (error) {
    return onSetState({
      isFetchPricesLoading: false,
      fetchPricesErrorMessage: error.message,
    });
  }

  const { prices } = data;

  onSetState({
    isFetchPricesLoading: false,
    isFetchPricesInitialised: true,
    fetchPricesErrorMessage: "",
    prices,
  });
};

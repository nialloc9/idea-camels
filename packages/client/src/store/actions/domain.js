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
 * @description fetches domains owned by account
 * @returns
 */
export const onFetch = () => async (dispatch, getState) => {
  const onSetState = setState(dispatch);

  const {
    account: { token },
    domain: { isFetchLoading, isFetchInitialised },
  } = getState();

  if (isFetchLoading || isFetchInitialised) return;

  const payload = { isFetchLoading: true, fetchErrorMessage: "", data: [] };
  try {
    onSetState(payload);

    const {
      data: { domains },
    } = await postApi({ uri: `domain/get-by-account`, token });

    payload.data = domains;
    payload.isFetchInitialised = true;
  } catch ({ message }) {
    payload.fetchErrorMessage = message;
  } finally {
    payload.isFetchLoading = false;

    onSetState(payload);
  }
};

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

  const payload = {
    isFetchPricesLoading: true,
    fetchPricesErrorMessage: "",
    prices: [],
  };
  try {
    onSetState(payload);

    const {
      data: { prices },
    } = await postApi({ uri: `domain/get-prices`, token });

    payload.prices = prices;
    payload.isFetchPricesInitialised = true;
  } catch ({ message }) {
    payload.fetchPricesErrorMessage = message;
  } finally {
    payload.isFetchPricesLoading = false;

    onSetState(payload);
  }
};

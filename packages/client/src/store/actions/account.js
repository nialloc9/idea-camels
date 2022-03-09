import { ACCOUNT_SET } from "../constants/account";
import { onResetStore } from "./store";
import { postApi } from "../../utils/request";
import { FORM_ERROR } from "../../utils/form";

/**
 * sets the loading state
 * @param payload
 */
const setState = (dispatch) => (payload) =>
  dispatch({
    type: ACCOUNT_SET,
    payload,
  });

/**
 * @description adds a new card to a customers account
 * @param {*} param0
 * @returns
 */
export const onAddNewCard = ({ id, card }) => async (dispatch, getState) => {
  const onSetState = setState(dispatch);

  const payload = { isAddCardLoading: true, addCardErrorMessage: "" };

  try {
    onSetState(payload);

    const {
      account: { token },
    } = getState();

    await postApi({
      uri: `payment/add-card`,
      token,
      body: {
        cardToken: id,
      },
    });

    payload.card = card;

    payload.addCardErrorMessage = "";
  } catch ({ message }) {
    payload.addCardErrorMessage = message;
  } finally {
    payload.isAddCardLoading = false;
    onSetState(payload);
  }
};

export const onFetchAccount = ({
  email,
  password,
  rememberMe = false,
}) => async (dispatch) => {
  const onSetState = setState(dispatch);

  const payload = { isFetchLoading: true };

  try {
    onSetState(payload);

    const response = await postApi({
      uri: `account/login`,
      body: { email, password, rememberMe },
    });

    const {
      data: { token, account, card },
    } = response;

    payload.token = token;
    payload.data = account;
    payload.card = card;
    payload.fetchErrorMessage = "";
  } catch ({ message, response: { data: { code } = {} } = {} }) {
    return {
      [FORM_ERROR]:
        code === 1003 ? "Invalid email/password combination" : message,
    };
  } finally {
    payload.isFetchLoading = false;
    onSetState(payload);
  }
};

export const onReAuthAccount = (originalToken) => async (dispatch) => {
  if (originalToken === "") return;

  try {
    const onSetState = setState(dispatch);

    const response = await postApi({
      uri: `account/reauthorise`,
      token: originalToken,
    });

    const {
      data: { token, account },
    } = response;

    onSetState({
      token,
      account,
    });
  } catch (error) {
    dispatch(onResetStore());
  }
};

export const onCreateAccount = ({
  firstName,
  lastName,
  phone,
  email,
  password,
  confirmPassword,
}) => async (dispatch) => {
  const onSetState = setState(dispatch);
  const payload = { isCreateLoading: true };
  try {
    if (password !== confirmPassword) {
      return { [FORM_ERROR]: "Passwords do not match" };
    }

    onSetState(payload);

    const response = await postApi({
      uri: `account/create`,
      body: { firstName, lastName, phone, email, password },
    });

    const {
      data: { token },
    } = response;
    payload.token = token;
    payload.data = {
      firstName,
      lastName,
      phone,
      email,
      password,
    };
  } catch ({ message }) {
    return { [FORM_ERROR]: message };
  } finally {
    payload.isCreateLoading = false;
    onSetState(payload);
  }
};

/**
 * @description updates a customers account information
 * @param {*} param0
 * @returns
 */
export const onUpdateAccount = ({
  firstName,
  lastName,
  phone,
  email,
  password,
  confirmPassword,
}) => async (dispatch, getState) => {
  const onSetState = setState(dispatch);
  const payload = { isUpdateLoading: true, updateSuccessMesssage: "" };
  try {
    if (password && password !== confirmPassword) {
      return { [FORM_ERROR]: "Passwords do not match" };
    }

    const {
      account: { token },
    } = getState();

    onSetState(payload);

    await postApi({
      uri: `account/update`,
      token,
      body: { updateData: { firstName, lastName, phone, email, password } },
    });

    payload.data = {
      firstName,
      lastName,
      phone,
      email,
    };

    payload.updateSuccessMesssage = "Successfully Updated";
  } catch ({ message }) {
    return { [FORM_ERROR]: message };
  } finally {
    payload.isUpdateLoading = false;
    onSetState(payload);
  }
};

export const onForgottonPassword = ({ email }) => async (dispatch) => {
  const onSetState = setState(dispatch);
  const payload = {
    isForgottonPasswordLoading: true,
    forgottonPasswordErrorMessage: "",
    forgottonPasswordSuccessMessage: "",
  };
  try {
    onSetState(payload);

    const response = await postApi({
      uri: `account/forgotton-password`,
      body: { email },
    });

    const {
      data: { token },
    } = response;
    payload.token = token;
    payload.createErrorMessage = "";
  } catch ({ message }) {
    payload.forgottonPasswordErrorMessage = message;
  } finally {
    payload.isForgottonPasswordLoading = false;
    payload.forgottonPasswordSuccessMessage = `An email has been sent to ${email}.`;
    onSetState(payload);
  }
};

export const onLogout = () => (dispatch) => dispatch(onResetStore());

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
    console.log("actions", response);
    const {
      data: { token, account },
    } = response;

    payload.token = token;
    payload.data = account;
    payload.fetchErrorMessage = "";
  } catch ({ message }) {
    console.log("message", message);
    return { [FORM_ERROR]: message };
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

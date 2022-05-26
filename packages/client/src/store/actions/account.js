import { ACCOUNT_SET } from "../constants/account";
import { onResetStore } from "./store";
import { postApi } from "../../utils/request";
import { FORM_ERROR } from "../../utils/form";
import { getQueryParameterByName } from "../../utils/utils";
import { handleIdentify } from "../../utils/analytics";

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

  onSetState({ isAddCardLoading: true, addCardErrorMessage: "" });

  const {
    account: { token },
  } = getState();

  const { error } = await postApi({
    uri: `payment/add-card`,
    token,
    body: {
      cardToken: id,
    },
  });

  if (error) {
    const { message } = error;
    return onSetState({
      isAddCardLoading: false,
      addCardErrorMessage: message,
    });
  }

  onSetState({ isAddCardLoading: false, addCardErrorMessage: "", card });
};

/**
 * @description fetchs an account using email and password
 * @param {*} param0
 * @returns
 */
export const onFetchAccount = ({
  email,
  password,
  rememberMe = false,
}) => async (dispatch) => {
  const onSetState = setState(dispatch);

  onSetState({ isFetchLoading: true, fetchErrorMessage: "" });

  const { data, error } = await postApi({
    uri: `account/login`,
    body: { email, password, rememberMe },
  });

  if (error) {
    return {
      [FORM_ERROR]: error.message,
    };
  }

  const { token, account, card } = data;

  onSetState({
    isFetchLoading: false,
    fetchErrorMessage: "",
    token,
    data: account,
    card,
  });

  handleIdentify(account.account_ref);
};

/**
 * @description checks token stored in storage to see if it is valid and if so returns account associated
 * @param {*} originalToken
 * @returns
 */
export const onReAuthAccount = (originalToken) => async (dispatch) => {
  if (originalToken === "") return;

  const onSetState = setState(dispatch);

  const { error, data } = await postApi({
    uri: `account/reauthorise`,
    token: originalToken,
  });

  if (error) {
    return dispatch(onResetStore());
  }

  const { token, account } = data;

  onSetState({
    token,
    data: account,
  });
};

/**
 * @description creates an account for the user
 * @param {*} param0
 * @returns
 */
export const onCreateAccount = ({
  firstName,
  lastName,
  phone,
  email,
  password,
  confirmPassword,
}) => async (dispatch) => {
  if (password !== confirmPassword) {
    return { [FORM_ERROR]: "Passwords do not match" };
  }

  const onSetState = setState(dispatch);

  onSetState({ isCreateLoading: true });

  const { data, error } = await postApi({
    uri: `account/create`,
    body: { firstName, lastName, phone, email, password },
  });

  if (error) {
    onSetState({ isCreateLoading: false });

    return { [FORM_ERROR]: error.message };
  }

  const { token } = data;

  onSetState({
    isCreateLoading: false,
    token,
    data: { firstName, lastName, phone, email, password },
  });

  handleIdentify(account.account_ref);
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
  if (password && password !== confirmPassword) {
    return { [FORM_ERROR]: "Passwords do not match" };
  }

  const onSetState = setState(dispatch);

  onSetState({ isUpdateLoading: true, updateSuccessMesssage: "" });

  const {
    account: { token },
  } = getState();

  const { error } = await postApi({
    uri: `account/update`,
    token,
    body: { updateData: { firstName, lastName, phone, email, password } },
  });

  if (error) {
    onSetState({ isUpdateLoading: false });

    return { [FORM_ERROR]: error.message };
  }

  onSetState({
    isUpdateLoading: false,
    updateSuccessMesssage: "Successfully Updated",
    data: {
      firstName,
      lastName,
      phone,
      email,
    },
  });
};

/**
 * @description sends a forgotton password email
 * @param {*} param0
 * @returns
 */
export const onForgottonPassword = ({ email }) => async (dispatch) => {
  const onSetState = setState(dispatch);

  onSetState({
    isForgottonPasswordLoading: true,
    forgottonPasswordSuccessMessage: "",
  });

  const { error } = await postApi({
    uri: `account/forgotton-password`,
    body: { email },
  });

  if (error) {
    onSetState({
      isForgottonPasswordLoading: false,
    });

    return { [FORM_ERROR]: error.message };
  }

  onSetState({ isForgottonPasswordLoading: false });

  onSetState({
    isForgottonPasswordLoading: false,
    forgottonPasswordSuccessMessage: `An email has been sent to ${email}.`,
  });
};

/**
 * @description takes token from url and updates password
 * @param {*} param0
 * @returns
 */
export const onResetPassword = ({ password, confirmPassword }) => async (
  dispatch
) => {
  if (password && password !== confirmPassword) {
    return { [FORM_ERROR]: "Passwords do not match" };
  }

  const onSetState = setState(dispatch);

  onSetState({
    resetPasswordSuccessMessage: "",
  });

  const token = getQueryParameterByName("token");

  const { error } = await postApi({
    uri: `account/update`,
    token,
    body: { updateData: { password } },
  });

  if (error) {
    return { [FORM_ERROR]: error.message };
  }

  onSetState({
    resetPasswordSuccessMessage: "Successfully Updated",
  });
};

export const onLogout = () => (dispatch) => dispatch(onResetStore());

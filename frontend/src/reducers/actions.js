import { ACTION } from '../utils/consts';

export const customerLogin = (payload) => (dispatch) => {
  dispatch({ type: ACTION.CUSTOMER_SIGIN, payload });
};

export const logout = (payload) => (dispatch) => {
  dispatch({ type: ACTION.RESET, payload });
};

export const showError = (payload) => (dispatch) => {
  dispatch({ type: ACTION.SHOWERROR, payload });
};

export const updateBooking = (payload) => (dispatch) => {
  dispatch({ type: ACTION.BOOKING, payload });
};

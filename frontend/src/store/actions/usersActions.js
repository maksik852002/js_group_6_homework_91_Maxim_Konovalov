import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE
} from "./actionsTypes";
import axios from "../../axiosBase";
import { push } from "connected-react-router";

export const registerUserRequest = () => ({ type: REGISTER_USER_REQUEST });
export const registerUserSuccess = () => ({ type: REGISTER_USER_SUCCESS });
export const registerUserFailure = error => ({
  type: REGISTER_USER_FAILURE,
  error
});

export const loginUserRequest = () => ({ type: LOGIN_USER_REQUEST });
export const loginUserSuccess = user => ({ type: LOGIN_USER_SUCCESS, user });
export const loginUserFailure = error => ({ type: LOGIN_USER_FAILURE, error });

export const logoutUserRequest = () => ({ type: LOGOUT_USER_REQUEST });
export const logoutUserSuccess = () => ({ type: LOGOUT_USER_SUCCESS });
export const logoutUserFailure = error => ({
  type: LOGOUT_USER_FAILURE,
  error
});

export const registerUser = userData => {
  return async dispatch => {
    try {
      dispatch(registerUserRequest());
      await axios.post("/users", userData);
      dispatch(registerUserSuccess());
      dispatch(push("/"));
    } catch (e) {
      if (e.response) {
        dispatch(registerUserFailure(e.response.data));
      } else {
        dispatch(
          registerUserFailure({ global: "Network error or no internet" })
        );
      }
    }
  };
};

export const loginUser = userData => {
  return async dispatch => {
    try {
      dispatch(loginUserRequest());
      const response = await axios.post("/users/sessions", userData);
      dispatch(loginUserSuccess(response.data));
      dispatch(push("/"));
    } catch (e) {
      if (e.response) {
        dispatch(loginUserFailure(e.response.data));
      } else {
        dispatch(loginUserFailure({ global: "Network error or no internet" }));
      }
    }
  };
};

export const logoutUser = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().users.user.token;
      const headers = { Authorization: "Token " + token };
      dispatch(logoutUserRequest());
      await axios.delete("/users/sessions", { headers });
      dispatch(logoutUserSuccess());
    } catch (e) {
      dispatch(logoutUserFailure(e));
    }
  };
};

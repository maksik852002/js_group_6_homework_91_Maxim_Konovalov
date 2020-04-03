import {
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE
} from "../actions/actionsTypes";

const initialState = {
  regLoading: false,
  regError: null,
  logLoading: false,
  logError: null,
  user: null
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { ...state, regLoading: true, regError: null };
    case REGISTER_USER_SUCCESS:
      return { ...state, regLoading: false };
    case REGISTER_USER_FAILURE:
      return { ...state, regError: action.error, regLoading: false };
    case LOGIN_USER_REQUEST:
      return { ...state, logLoading: true, logError: null };
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.user, logLoading: false, logError: null };
    case LOGIN_USER_FAILURE:
      return { ...state, logLoading: false, logError: action.error };
    case LOGOUT_USER_REQUEST:
      return { ...state, logLoading: true, logError: null };
    case LOGOUT_USER_SUCCESS:
      return { ...state, user: null, logLoading: false, logError: null };
    case LOGOUT_USER_FAILURE:
      return { ...state, logLoading: false, logError: action.error };
    default:
      return state;
  }
};

export default usersReducer;

import { Reducer } from "redux";
import {
  UserDataAction,
  UserPageAction,
  UserRequestErrorAction,
  UserRequestSuccessAction,
  UserState,
  UserTotalPageAction,
  USER_DATA,
  USER_PAGE,
  USER_REQUEST_ERROR,
  USER_REQUEST_SUCCESS,
  USER_TOTAL_PAGE,
} from "./userDataAction";

type UserAction =
  | UserDataAction
  | UserRequestSuccessAction
  | UserRequestErrorAction
  | UserPageAction
  | UserTotalPageAction;

export const userReducer: Reducer<UserState, UserAction> = (state: any, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        loading: true,
      };
    case USER_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case USER_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case USER_TOTAL_PAGE:
      return {
        ...state,
        totalPage: action.totalPage,
      };
    case USER_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

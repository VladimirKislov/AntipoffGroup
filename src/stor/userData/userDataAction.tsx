import { ActionCreator } from "redux";

export type UserState = {
  loading: boolean,
  data: Array<any>,
  page: number,
  totalPage: number,
  error: string,
}

export const USER_DATA = "USER_DATA";
export type UserDataAction = {
  type: typeof USER_DATA;
};
export const UserData: ActionCreator<UserDataAction> = () => ({
  type: USER_DATA,
});

export const USER_REQUEST_SUCCESS = "USER_REQUEST_SUCCESS";
export type UserRequestSuccessAction = {
  type: typeof USER_REQUEST_SUCCESS;
  data: Array<any>;
};
export const UserRequestSuccess: ActionCreator<UserRequestSuccessAction> = (data) => ({
  type: USER_REQUEST_SUCCESS,
  data,
});

export const USER_REQUEST_ERROR = "USER_REQUEST_ERROR";
export type UserRequestErrorAction = {
  type: typeof USER_REQUEST_ERROR;
  error: string;
};
export const UserRequestError: ActionCreator<UserRequestErrorAction> = (error) => ({
  type: USER_REQUEST_ERROR,
  error
});

export const USER_PAGE = "USER_PAGE";
export type UserPageAction = {
  type: typeof USER_PAGE;
  page: Number;
};
export const UserPage: ActionCreator<UserPageAction> = (page) => ({
  type: USER_PAGE,
  page,
});

export const USER_TOTAL_PAGE = "USER_TOTAL_PAGE";
export type UserTotalPageAction = {
  type: typeof USER_TOTAL_PAGE;
  totalPage: Number;
};
export const UserTotalPage: ActionCreator<UserTotalPageAction> = (totalPage) => ({
  type: USER_TOTAL_PAGE,
  totalPage,
});

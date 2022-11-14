import { AnyAction, Reducer } from "redux";
import { UserState, USER_DATA, USER_PAGE, USER_REQUEST_ERROR, USER_REQUEST_SUCCESS, USER_TOTAL_PAGE } from "./userData/userDataAction";
import { ADD_TOKEN, DELETE_TOKEN } from "./tokenAction";
import { userReducer } from "./userData/userDataReducer";

export type RootState = {
  token: string;
  data: UserState;
};

const initialState: RootState = {
  token: "",
  data: {
    loading: false,
    data: [],
    page: 0,
    totalPage: 0,
    error: "",
  },
};

export const RootReducer: Reducer<RootState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
    case DELETE_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case USER_DATA:
    case USER_REQUEST_SUCCESS:
    case USER_REQUEST_ERROR:
    case USER_PAGE:
    case USER_TOTAL_PAGE:
      return {
        ...state,
        data: userReducer(state.data, action),
      };
    default:
      return state;
  }
};

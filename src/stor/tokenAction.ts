import { ActionCreator } from "redux";

export const ADD_TOKEN = "ADD_TOKEN";
export const DELETE_TOKEN = "DELETE_TOKEN";

export type AddToken = {
  type: typeof ADD_TOKEN;
  token: string;
};
export const addTokenAction: ActionCreator<AddToken> = (token) => ({
  type: ADD_TOKEN,
  token,
});

export type delToken = {
  type: typeof DELETE_TOKEN;
  token: string;
};
export const deleteTokenAction: ActionCreator<delToken> = (token) => ({
  type: DELETE_TOKEN,
  token,
});

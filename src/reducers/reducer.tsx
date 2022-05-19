import { IState, Action } from "../interfaces/interfaces";

export const reducer = (state: IState, action: Action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.user };
    case "logout":
      return { ...state, user: null };
    default:
      throw new Error(`There is no such action`);
  }
};

export const initialState: IState = {
  user: JSON.parse(window.localStorage.getItem("token-data") ?? "null"),
};

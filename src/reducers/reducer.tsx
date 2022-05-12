export interface IUser {
  email: string;
  token: string;
  userId: string;
}

interface ILoginAction {
  type: "login";
  user: IUser;
}

interface ILogoutAction {
  type: "logout";
}

export interface IState {
  user: IUser | null;
}

export type Action = ILoginAction | ILogoutAction;

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

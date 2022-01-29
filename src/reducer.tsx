interface ISetAuth {
  email: string;
  token: string;
  userId: string;
}

interface IState {
  user: ISetAuth | null;
}

interface ILoginAction {
  type: "login";
  user: ISetAuth;
}

interface ILogoutAction {
  type: "logout";
}

type Action = ILoginAction | ILogoutAction;

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

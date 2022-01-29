/* eslint-disable no-unused-vars */
import React from "react";

interface ISetAuth {
  email: string;
  token: string;
  userId: string;
}

interface ILoginAction {
  type: "login";
  user: ISetAuth;
}

interface ILogoutAction {
  type: "logout";
}

type Action = ILoginAction | ILogoutAction;

interface IReducerContext {
  state: object;
  dispatch: React.Dispatch<Action>;
}

const ReducerContext = React.createContext<IReducerContext | null>(null);

export default ReducerContext;

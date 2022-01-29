/* eslint-disable no-unused-vars */
import React from "react";

interface ISetAuth {
  email: string;
  token: string;
  userId: string;
}

interface AuthContext {
  user: ISetAuth | null;
  login: (user: ISetAuth) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export default AuthContext;

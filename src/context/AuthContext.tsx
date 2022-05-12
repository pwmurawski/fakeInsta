/* eslint-disable no-unused-vars */
import React from "react";
import { IUser } from "../reducers/reducer";

interface AuthContext {
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export default AuthContext;

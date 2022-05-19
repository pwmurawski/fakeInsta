/* eslint-disable no-unused-vars */
import React from "react";
import { IAuthContext } from "../interfaces/interfaces";

const AuthContext = React.createContext<IAuthContext | null>(null);

export default AuthContext;

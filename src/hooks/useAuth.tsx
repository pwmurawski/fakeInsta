/* eslint-disable no-unused-vars */
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

interface ISetAuth {
  email: string;
  token: string;
  userId: string;
}

export default function useAuth(): [
  auth: ISetAuth | null,
  setAuth: (flag: boolean, user?: ISetAuth) => void
] {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not available");
  }
  const auth = authContext.user;

  const setAuth = (flag: boolean, user?: ISetAuth) => {
    if (flag && user) {
      if (user.token && user.userId) {
        authContext.login(user);
        window.localStorage.setItem("token-data", JSON.stringify(user));
      }
    } else if (!flag) {
      authContext.logout();
      window.localStorage.removeItem("token-data");
    }
  };

  return [auth, setAuth];
}

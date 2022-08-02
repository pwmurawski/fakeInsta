import { useState } from "react";
import { fetchAuthLogin } from "../api/authQuery";
import { ILoginData } from "../interfaces/interfaces";
import useAuth from "./useAuth";

const useLogin = (): [login: typeof login, error: typeof error] => {
  const [error, setError] = useState("");
  const [auth, setAuth] = useAuth();

  const login = async (loginData: ILoginData) => {
    const res = await fetchAuthLogin(loginData);
    if (res) {
      if (!res.error) {
        setAuth(true, {
          email: res.email,
          token: res.idToken,
          userId: res.localId,
        });
      } else {
        setError(res.error.errors[0].message);
      }
    }
  };

  return [login, error];
};

export default useLogin;

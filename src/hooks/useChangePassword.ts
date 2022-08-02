import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { fetchAuthEditAccountData } from "../api/authQuery";

const useChangePassword = (): [
  newPass: typeof newPass,
  setNewPass: typeof setNewPass,
  changePassword: typeof changePassword
] => {
  const [auth, setAuth] = useAuth();
  const [newPass, setNewPass] = useState("");

  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (auth) {
      const res = await fetchAuthEditAccountData({
        idToken: auth.token,
        password: newPass,
        returnSecureToken: false,
      });

      if (res) {
        setAuth(true, {
          email: res.email,
          token: res.idToken,
          userId: res.localId,
        });
      }
    }
  };

  return [newPass, setNewPass, changePassword];
};

export default useChangePassword;

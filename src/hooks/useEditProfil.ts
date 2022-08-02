import { useState } from "react";
import { fetchAuthEditAccountData } from "../api/authQuery";
import { fetchEditUserData } from "../api/userQuery";
import { IUserDataProfileSet } from "../interfaces/interfaces";
import useAuth from "./useAuth";

const useEditProfil = (
  setUserAuthData: React.Dispatch<
    React.SetStateAction<IUserDataProfileSet | undefined>
  >
): [editProfil: typeof editProfil, error: typeof error] => {
  const [auth, setAuth] = useAuth();
  const [error, setError] = useState("");

  const editProfil = async (data: IUserDataProfileSet) => {
    setUserAuthData(data);

    fetchEditUserData(data.userId, data.id, {
      ...data,
      id: undefined,
    });

    if (auth) {
      const res = await fetchAuthEditAccountData({
        idToken: auth.token,
        email: data.email,
        returnSecureToken: false,
      });

      if (res) {
        setAuth(true, {
          email: res.email,
          token: res.idToken,
          userId: res.localId,
        });
        if (res.error) {
          setError(res.error.errors[0].message);
        }
      }
    }
  };

  return [editProfil, error];
};

export default useEditProfil;

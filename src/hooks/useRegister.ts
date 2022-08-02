import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAuthRegister } from "../api/authQuery";
import { fetchCreateUserData } from "../api/userQuery";
import { IRegisterData, IUserData } from "../interfaces/interfaces";
import useAuth from "./useAuth";

const useRegister = (): [register: typeof register, error: typeof error] => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [auth, setAuth] = useAuth();

  const register = async (registerData: IRegisterData, userData: IUserData) => {
    if (userData.userFullName.length >= 3 && userData.userName.length >= 3) {
      const res = await fetchAuthRegister(registerData);
      if (res) {
        if (!res?.error) {
          setAuth(true, {
            email: res.email,
            token: res.idToken,
            userId: res.localId,
          });
          fetchCreateUserData(res.localId, {
            ...userData,
            email: res.email,
            userId: res.localId,
          });
          navigate("/");
        } else {
          setError(res.error.errors[0].message);
        }
      }
    } else {
      setError("ERR_USERNAME");
    }
  };

  return [register, error];
};

export default useRegister;

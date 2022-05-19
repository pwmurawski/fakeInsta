import {
  IEditEmail,
  IEditPassword,
  ILoginData,
  IRegisterData,
} from "../interfaces/interfaces";
import fetchApiAuth from "./fetchApi/fetchApiAuth";

type Edit = IEditPassword | IEditEmail;

export const fetchAuthLogin = (loginData: ILoginData) => {
  return fetchApiAuth("accounts:signInWithPassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
};

export const fetchAuthRegister = (registerData: IRegisterData) => {
  return fetchApiAuth(`accounts:signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });
};

export const fetchAuthEditAccountData = (newData: Edit) => {
  return fetchApiAuth("accounts:update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
};

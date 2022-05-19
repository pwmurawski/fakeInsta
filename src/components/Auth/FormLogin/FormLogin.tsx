/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  AuthForm,
  AuthFormInput,
  AuthFormSubmitBtn,
} from "../../../GlobalStyle/GlobalStyle";
import useAuth from "../../../hooks/useAuth";
import { fetchAuthLogin } from "../../../api/authQuery";
import { IFormLoginProps } from "../../../interfaces/interfaces";

export default function FormLogin({ onError }: IFormLoginProps) {
  const [auth, setAuth] = useAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetchAuthLogin(loginData);
    if (res) {
      if (!res.error) {
        setAuth(true, {
          email: res.email,
          token: res.idToken,
          userId: res.localId,
        });
      } else {
        onError(res.error.errors[0].message);
      }
    }
  };

  return (
    <AuthForm onSubmit={submit}>
      <AuthFormInput
        type="email"
        placeholder="Adres e-mail"
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
      />
      <AuthFormInput
        type="password"
        placeholder="Hasło"
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
      />
      <AuthFormSubmitBtn type="submit">Zaloguj się</AuthFormSubmitBtn>
    </AuthForm>
  );
}

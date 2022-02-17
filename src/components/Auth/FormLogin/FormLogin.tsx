/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  AuthForm,
  AuthFormInput,
  AuthFormSubmitBtn,
} from "../../../GlobalStyle/GlobalStyle";
import FetchAuth from "../../../helpers/Fetch/FetchAuth";
import useAuth from "../../../hooks/useAuth";

interface IFormLoginProps {
  onError: (error: string) => void;
}

export default function FormLogin({ onError }: IFormLoginProps) {
  const [auth, setAuth] = useAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    FetchAuth(
      "accounts:signInWithPassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      },
      (res) => {
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
    );
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

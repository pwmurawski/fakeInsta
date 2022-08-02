/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  AuthForm,
  AuthFormInput,
  AuthFormSubmitBtn,
} from "../../../GlobalStyle/GlobalStyle";
import { IFormLoginProps } from "../../../interfaces/interfaces";

export default function FormLogin({ onSubmit }: IFormLoginProps) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  return (
    <AuthForm
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(loginData);
      }}
    >
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

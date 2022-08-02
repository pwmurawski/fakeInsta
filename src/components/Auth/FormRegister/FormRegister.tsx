import { useState } from "react";
import {
  AuthForm,
  AuthFormInput,
  AuthFormSubmitBtn,
} from "../../../GlobalStyle/GlobalStyle";
import { IFormRegisterProps } from "../../../interfaces/interfaces";

export default function FormRegister({ onSubmit }: IFormRegisterProps) {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    returnSecureToken: true,
  });
  const [userData, setUserData] = useState({
    userFullName: "",
    userName: "",
  });

  return (
    <AuthForm
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(registerData, userData);
      }}
    >
      <AuthFormInput
        type="email"
        placeholder="Adres e-mail"
        onChange={(e) =>
          setRegisterData({ ...registerData, email: e.target.value })
        }
      />
      <AuthFormInput
        placeholder="Imię i nazwisko"
        onChange={(e) =>
          setUserData({ ...userData, userFullName: e.target.value })
        }
      />
      <AuthFormInput
        placeholder="Nazwa użytkownika"
        onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
      />
      <AuthFormInput
        type="password"
        placeholder="Hasło"
        onChange={(e) =>
          setRegisterData({ ...registerData, password: e.target.value })
        }
      />
      <AuthFormSubmitBtn>Dalej</AuthFormSubmitBtn>
    </AuthForm>
  );
}

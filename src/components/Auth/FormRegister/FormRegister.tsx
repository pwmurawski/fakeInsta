/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthForm,
  AuthFormInput,
  AuthFormSubmitBtn,
} from "../../../GlobalStyle/GlobalStyle";
import useAuth from "../../../hooks/useAuth";
import FetchAuth from "../../../helpers/Fetch/FetchAuth";
import Fetch from "../../../helpers/Fetch/Fetch";

interface IFormRegisterProps {
  onError: (error: string) => void;
}

export default function FormRegister({ onError }: IFormRegisterProps) {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    returnSecureToken: true,
  });
  const [userData, setUserData] = useState({
    userFullName: "",
    userName: "",
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userData.userFullName.length >= 3 && userData.userName.length >= 3) {
      FetchAuth(
        `accounts:signUp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        },
        (res) => {
          if (!res.error) {
            setAuth(true, {
              email: res.email,
              token: res.idToken,
              userId: res.localId,
            });
            Fetch(`users/${res.localId}.json`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...userData,
                email: res.email,
                userId: res.localId,
              }),
            });
            navigate("/");
          } else {
            onError(res.error.errors[0].message);
          }
        }
      );
    } else {
      onError("ERR_USERNAME");
    }
  };

  return (
    <AuthForm onSubmit={submit}>
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

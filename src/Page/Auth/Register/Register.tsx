import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  WrapperAuth,
  AuthSection,
  AuthContainer,
  AuthForm,
  AuthFormInput,
  AuthFormSubmitBtn,
  Logo,
  AltOption,
  AuthLinkStyle,
} from "../../../GlobalStyle/GlobalStyle";
import logo from "../../../assets/logo.png";
import FetchAuth from "../../../helpers/Fetch/FetchAuth";
import Fetch from "../../../helpers/Fetch/Fetch";
import useAuth from "../../../hooks/useAuth";

const Info = styled.h2`
  text-align: center;
  font-size: 16px;
  color: gray;
  margin: 0 40px 10px;
`;
const Desc = styled.p`
  text-align: center;
  font-size: 11px;
  color: gray;
  margin: 10px 40px;
`;

interface IRes {
  email: string;
  idToken: string;
  localId: string;
  error: object;
}

export default function Register() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
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

    FetchAuth(
      `accounts:signUp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      },
      (res: IRes) => {
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
        }
      }
    );
  };

  return (
    <WrapperAuth>
      <AuthSection>
        <AuthContainer height="fit-content">
          <Logo src={logo} alt="insta" />
          <Info>
            Zarejestruj się, aby przeglądać zdjęcia i filmy znajomych.
          </Info>
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
              onChange={(e) =>
                setUserData({ ...userData, userName: e.target.value })
              }
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
          <Desc>
            Rejestrując się, akceptujesz Regulamin. Informacje o tym, jak
            zbieramy, wykorzystujemy i udostępniamy Twoje dane, zawierają nasze
            Zasady dotyczące danych. O wykorzystaniu plików cookie i podobnych
            technologii informują Zasady dotyczące plików cookie.
          </Desc>
        </AuthContainer>
        <AltOption>
          <p>
            Masz konto? <AuthLinkStyle to="/">Zaloguj się</AuthLinkStyle>
          </p>
        </AltOption>
      </AuthSection>
    </WrapperAuth>
  );
}

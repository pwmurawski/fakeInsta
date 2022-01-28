import { useState } from "react";
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

export default function Login({
  setIsAuth,
}: {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const apiKey = "AIzaSyCKGa9b1EB7uMT-j-ekzW9VFK8Jd4d5_uE";
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    FetchAuth(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      },
      (res) => {
        console.log(res);
      }
    );
  };

  return (
    <WrapperAuth>
      <AuthSection>
        <AuthContainer>
          <Logo src={logo} alt="insta" />
          <AuthForm onSubmit={submit}>
            <AuthFormInput
              type="email"
              placeholder="Adres e-mail"
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
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
        </AuthContainer>
        <AltOption>
          <p>
            Nie masz konta?{" "}
            <AuthLinkStyle to="/accounts/emailsignup/">
              Zarejestruj się
            </AuthLinkStyle>
          </p>
        </AltOption>
      </AuthSection>
    </WrapperAuth>
  );
}

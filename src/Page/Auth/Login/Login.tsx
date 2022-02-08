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
import useAuth from "../../../hooks/useAuth";
import ErrorInfo from "../../../components/ErrorInfo/ErrorInfo";

export default function Login() {
  const [auth, setAuth] = useAuth();
  const [error, setError] = useState("");
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
          setError(res.error.errors[0].message);
        }
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
          <ErrorInfo error={error} />
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

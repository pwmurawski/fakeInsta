import { useState } from "react";
import {
  WrapperAuth,
  AuthSection,
  AuthContainer,
  Logo,
  AltOption,
  AuthLinkStyle,
} from "../../../GlobalStyle/GlobalStyle";
import logo from "../../../assets/logo.png";
import ErrorInfo from "../../../components/Auth/ErrorInfo/ErrorInfo";
import FormLogin from "../../../components/Auth/FormLogin/FormLogin";

export default function Login() {
  const [error, setError] = useState("");

  const errorHandler = (newError: string) => {
    setError(newError);
  };

  return (
    <WrapperAuth>
      <AuthSection>
        <AuthContainer>
          <Logo src={logo} alt="insta" />
          <FormLogin onError={errorHandler} />
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

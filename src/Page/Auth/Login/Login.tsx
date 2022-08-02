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
import useLogin from "../../../hooks/useLogin";

export default function Login() {
  const [login, error] = useLogin();

  return (
    <WrapperAuth>
      <AuthSection>
        <AuthContainer>
          <Logo src={logo} alt="insta" />
          <FormLogin onSubmit={login} />
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

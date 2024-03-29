import styled from "styled-components";
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
import FormRegister from "../../../components/Auth/FormRegister/FormRegister";
import useRegister from "../../../hooks/useRegister";

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

export default function Register() {
  const [register, error] = useRegister();

  return (
    <WrapperAuth>
      <AuthSection>
        <AuthContainer height="fit-content">
          <Logo src={logo} alt="insta" />
          <Info>
            Zarejestruj się, aby przeglądać zdjęcia i filmy znajomych.
          </Info>
          <FormRegister onSubmit={register} />
          <ErrorInfo error={error} />
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

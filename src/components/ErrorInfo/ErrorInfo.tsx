/* eslint-disable react/jsx-no-useless-fragment */
import styled from "styled-components";

const Error = styled.section`
  font-size: 13px;
  text-align: center;
  padding: 10px 40px;
  color: red;
`;

interface IErrorInfoProps {
  error: string;
  register?: boolean;
}

const defaultProps = {
  register: false,
};

export default function ErrorInfo({ error, register }: IErrorInfoProps) {
  return (
    <>
      {register ? (
        <Error>
          {error === "ERR_USERNAME"
            ? "Imię, nazwisko i nazwa użytkownika musi mieć przynajmniej 3 znaki."
            : null}
          {error === "INVALID_EMAIL" || error === "MISSING_EMAIL"
            ? "Email nie może być pusty."
            : null}
          {error === "EMAIL_EXISTS"
            ? "Adres email jest używany na innym koncie."
            : null}
          {error === "MISSING_PASSWORD" ? "Hasło nie może być puste." : null}
          {error.includes("WEAK_PASSWORD")
            ? "Hasło powinno mieć co najmniej 6 znaków."
            : null}
        </Error>
      ) : (
        <Error>
          {error === "INVALID_EMAIL" ? "Email nie może być pusty." : null}
          {error === "EMAIL_NOT_FOUND"
            ? "Wprowadzony email nie należy do konta. Sprawdź swoj email i spróbuj ponownie."
            : null}
          {error === "MISSING_PASSWORD" ? "Hasło nie może być puste." : null}
          {error === "INVALID_PASSWORD"
            ? "Niestety wprowadzone hasło jest nieprawidłowe. Sprawdź poprawność wpisanego hasła."
            : null}
          {error.includes("TOO_MANY_ATTEMPTS_TRY_LATER")
            ? "Dostęp do tego konta został tymczasowo wyłączony z powodu wielu nieudanych prób logowania. Spróbuj ponownie później. "
            : null}
        </Error>
      )}
    </>
  );
}

ErrorInfo.defaultProps = defaultProps;

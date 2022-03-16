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
}

export default function ErrorInfo({ error }: IErrorInfoProps) {
  const errors = [
    {
      name: "ERR_USERNAME",
      value:
        "Imię, nazwisko i nazwa użytkownika musi mieć przynajmniej 3 znaki.",
    },
    { name: "INVALID_EMAIL", value: "Email nie może być pusty." },
    { name: "MISSING_EMAIL", value: "Email nie może być pusty." },
    {
      name: "EMAIL_EXISTS",
      value: "Adres email jest używany na innym koncie.",
    },
    {
      name: "MISSING_PASSWORD",
      value: "Hasło nie może być puste.",
    },
    {
      name: "WEAK_PASSWORD",
      value: "Hasło powinno mieć co najmniej 6 znaków.",
    },
    {
      name: "EMAIL_NOT_FOUND",
      value:
        "Wprowadzony email nie należy do konta. Sprawdź swoj email i spróbuj ponownie.",
    },
    {
      name: "INVALID_PASSWORD",
      value:
        "Niestety wprowadzone hasło jest nieprawidłowe. Sprawdź poprawność wpisanego hasła.",
    },
    {
      name: "TOO_MANY_ATTEMPTS_TRY_LATER",
      value:
        "Dostęp do tego konta został tymczasowo wyłączony z powodu wielu nieudanych prób logowania. Spróbuj ponownie później.",
    },
  ];

  let displayError = null;
  if (error) {
    displayError = errors.filter(({ name }) => name.includes(error))[0].value;
    if (!displayError.length) {
      displayError = error;
    }
  } else return null;

  return <Error>{displayError}</Error>;
}

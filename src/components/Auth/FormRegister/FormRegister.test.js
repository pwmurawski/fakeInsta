/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-undef */
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import FormRegister from "./FormRegister";
import AuthContext from "../../../context/AuthContext";

const renderWithRouter = (children, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(children, { wrapper: BrowserRouter });
};

const mockedContext = {
  user: { email: "email", token: "token", userId: "userId" },
  login: jest.fn(),
  logout: jest.fn(),
};

const renderFormRegister = () => {
  const utils = renderWithRouter(
    <AuthContext.Provider value={mockedContext}>
      <FormRegister />
    </AuthContext.Provider>,
    { route: "/accounts/emailsignup/" }
  );

  return { ...utils };
};

describe("FormRegister component", () => {
  it("render input placeholder 'Adres e-mail'", () => {
    const { getByPlaceholderText } = renderFormRegister();
    const inputEmail = getByPlaceholderText(/Adres e-mail/i);

    expect(inputEmail).toBeInTheDocument();
  });
  it("render input placeholder 'Imię i nazwisko'", () => {
    const { getByPlaceholderText } = renderFormRegister();
    const inputFullName = getByPlaceholderText(/Imię i nazwisko/i);

    expect(inputFullName).toBeInTheDocument();
  });
  it("render input placeholder 'Nazwa użytkownika'", () => {
    const { getByPlaceholderText } = renderFormRegister();
    const inputName = getByPlaceholderText(/Nazwa użytkownika/i);

    expect(inputName).toBeInTheDocument();
  });
  it("render input placeholder 'Hasło'", () => {
    const { getByPlaceholderText } = renderFormRegister();
    const inputPassword = getByPlaceholderText(/hasło/i);

    expect(inputPassword).toBeInTheDocument();
  });
  it("render button text 'Dalej'", () => {
    const { getByText } = renderFormRegister();
    const submitButton = getByText(/dalej/i);

    expect(submitButton).toBeInTheDocument();
  });
  it("change email", () => {
    const { getByPlaceholderText } = renderFormRegister();
    const inputEmail = getByPlaceholderText(/Adres e-mail/i);

    fireEvent.change(inputEmail, { target: { value: "email" } });
    expect(inputEmail).toHaveValue("email");
  });
  it("change firstName and lastName", () => {
    const { getByPlaceholderText } = renderFormRegister();
    const inputFullName = getByPlaceholderText(/Imię i nazwisko/i);

    fireEvent.change(inputFullName, { target: { value: "name name" } });
    expect(inputFullName).toHaveValue("name name");
  });
  it("change userName", () => {
    const { getByPlaceholderText } = renderFormRegister();
    const inputUserName = getByPlaceholderText(/Nazwa użytkownika/i);

    fireEvent.change(inputUserName, { target: { value: "user" } });
    expect(inputUserName).toHaveValue("user");
  });
  it("change password", () => {
    const { getByPlaceholderText } = renderFormRegister();
    const inputPassword = getByPlaceholderText(/hasło/i);

    fireEvent.change(inputPassword, { target: { value: "password" } });
    expect(inputPassword).toHaveValue("password");
  });
  it("sending a query to the backend", () => {
    const baseUrl = process.env.REACT_APP_DATABASE_AUTH;
    const keyApi = process.env.REACT_APP_KEYAPI;
    const url = "accounts:signUp";
    const resfetchMock = {
      res: {
        error: {
          errors: [{ message: "error" }],
        },
      },
    };
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => resfetchMock,
      })
    );

    const { getByText, getByPlaceholderText } = renderFormRegister();
    const submitButton = getByText(/dalej/i);
    const userFullName = getByPlaceholderText(/Imię i nazwisko/i);
    const userName = getByPlaceholderText(/Nazwa użytkownika/i);

    fireEvent.change(userFullName, { target: { value: "user user" } });
    fireEvent.change(userName, { target: { value: "userName" } });
    fireEvent.click(submitButton);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(`${baseUrl}${url}${keyApi}`, {
      body: '{"email":"","password":"","returnSecureToken":true}',
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
  });
});

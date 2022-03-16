/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-undef */
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FormLogin from "./FormLogin";
import AuthContext from "../../../context/AuthContext";

const mockedContext = {
  user: { email: "email", token: "token", userId: "userId" },
  login: jest.fn(),
  logout: jest.fn(),
};

const renderFormLogin = () => {
  const error = () => {};
  const utils = render(
    <AuthContext.Provider value={mockedContext}>
      <FormLogin onError={error} />
    </AuthContext.Provider>
  );

  return { ...utils };
};

afterEach(() => {
  jest.clearAllMocks();
});

describe("FromLogin component", () => {
  it("renders input 'Adres e-mail'", () => {
    const { getByPlaceholderText } = renderFormLogin();
    const inputEmail = getByPlaceholderText(/adres e-mail/i);

    expect(inputEmail).toBeInTheDocument();
  });
  it("change email", () => {
    const { getByPlaceholderText } = renderFormLogin();
    const inputEmail = getByPlaceholderText(/adres e-mail/i);

    fireEvent.change(inputEmail, { target: { value: "email" } });
    expect(inputEmail).toHaveValue("email");
  });
  it("renders input 'Hasło'", () => {
    const { getByPlaceholderText } = renderFormLogin();
    const inputPassword = getByPlaceholderText(/hasło/i);

    expect(inputPassword).toBeInTheDocument();
  });
  it("change password", () => {
    const { getByPlaceholderText } = renderFormLogin();
    const inputPassword = getByPlaceholderText(/hasło/i);

    fireEvent.change(inputPassword, { target: { value: "password" } });
    expect(inputPassword).toHaveValue("password");
  });
  it("renders button 'Zaloguj się'", () => {
    const { getByText } = renderFormLogin();
    const buttonSignIn = getByText(/zaloguj się/i);

    expect(buttonSignIn).toBeInTheDocument();
  });
  it("sending a query to the backend", async () => {
    const baseUrl = process.env.REACT_APP_DATABASE_AUTH;
    const keyApi = process.env.REACT_APP_KEYAPI;
    const url = "accounts:signInWithPassword";
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

    const { getByText, getByPlaceholderText } = renderFormLogin();
    const inputEmail = getByPlaceholderText(/adres e-mail/i);
    const inputPassword = getByPlaceholderText(/hasło/i);
    const buttonSignIn = getByText(/zaloguj się/i);

    fireEvent.change(inputEmail, { target: { value: "email" } });
    fireEvent.change(inputPassword, { target: { value: "password" } });
    fireEvent.click(buttonSignIn);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(`${baseUrl}${url}${keyApi}`, {
      body: '{"email":"email","password":"password"}',
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    expect((await global.fetch()).json()).toEqual(resfetchMock);
  });
});

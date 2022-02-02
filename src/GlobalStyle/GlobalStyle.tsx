import styled, { createGlobalStyle, css } from "styled-components";
import { Link } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
    body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: whitesmoke;
    }
`;

export const LinkPost = styled(Link)`
  text-decoration: none;
  font-size: 13px;
  color: ${({ color }) => color ?? "black"};
`;
export const LikeContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 18px;
  padding: 0 16px;
  margin-bottom: 8px;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
`;
export const TimeContainer = styled(LikeContainer)`
  color: gray;
  font-size: 12px;
  font-weight: 400;
`;
export const Btn = styled.button`
  display: flex;
  align-items: center;
  align-self: center;
  width: 40px;
  height: 40px;
  padding: 8px;
  background: transparent;
  border: 0;
  cursor: pointer;
`;
export const UserLogo = styled.img`
  box-sizing: border-box;
  margin: 0 3px;
  width: ${({ width }) => width ?? "42px"};
  height: ${({ height }) => height ?? "42px"};
  border-radius: 150px;
  cursor: pointer;
  border: ${({ storiesActive }: { storiesActive?: boolean }) =>
    storiesActive ? "2px solid violet" : "null"};
`;
export const UserNameDesc = styled.span`
  font-size: 14px;
  font-weight: bold;
`;
export const TextDesc = styled.p`
  width: 100%;
  height: fit-content;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
  word-wrap: break-word;
`;
export const DescriptionPost = styled.section`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0 16px;
`;

export const ModalWindowWrapper = styled.section`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 64px;
  background-color: rgba(0, 0, 0, 0.8);
  transition: padding 1000ms;
  z-index: 1;
  ::before {
    position: fixed;
    top: 2px;
    right: 12px;
    content: "🗙";
    color: white;
    font-size: 35px;
    cursor: pointer;
  }

  @media (max-width: 760px) {
    padding: 24px 0;
  }
`;

export const HeaderCreatePost = styled.header`
  display: flex;
  justify-content: ${({ justify }: { justify?: string }) =>
    justify ?? "center"};
  align-items: center;
  width: 100%;
  height: 42px;
  border-bottom: 1px solid lightgray;
`;

export const HeaderProfilSet = styled.header`
  display: flex;
  align-items: center;
  height: 42px;
  margin-top: 32px;
  margin-bottom: ${({ marginBottom }: { marginBottom?: string }) =>
    marginBottom};
  :first-child {
    margin-left: 124px;
  }
`;
export const UserNameContainer = styled.div`
  margin-left: 32px;
`;
export const UserName = styled.h1`
  display: flex;
  align-items: center;
  margin: 0 0 2px 0;
  height: 22px;
  font-size: ${({ fontSize }: { fontSize?: string }) => fontSize ?? "20px"};
  font-weight: 400;
`;
export const EditUserImgBtn = styled.button`
  display: flex;
  align-items: center;
  height: 18px;
  background: transparent;
  border: 0;
  padding: 0;
  color: #0095f6;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 16px 0 16px 0;
`;
export const EditContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`;
export const Aside = styled.aside`
  box-sizing: border-box;
  text-align: end;
  width: 194px;
  height: fit-content;
  margin-top: 4px;
  padding: 0 32px;
`;
export const Label = styled.label`
  font-size: 15px;
  font-weight: 600;
`;
export const InputContainer = styled.div`
  box-sizing: border-box;
  max-width: 502px;
  width: 100%;
  height: 100%;
  padding-right: 60px;
`;

export const Input = styled.input`
  box-sizing: border-box;
  max-width: 355px;
  width: 100%;
  height: 32px;
  padding: 0 10px;
  margin: 0;
  border: 1px solid lightgray;
  border-radius: 3px;
  font-size: 15px;

  ${({ changePass }: { changePass?: boolean }) =>
    changePass &&
    css`
      max-width: 100%;
      height: 40px;
      border-radius: 6px;
      padding: 4px 10px;
      background-color: whitesmoke;
    `}
`;

export const SubmitBtn = styled.button`
  width: fit-content;
  height: 30px;
  padding: 0 11px;
  background-color: #0095f6;
  border: 0;
  border-radius: 4px;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

export const WrapperAuth = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 98vh;
`;
export const AuthSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 700px;
`;
export const AuthContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: ${({ height }: { height?: string }) => height ?? "320px"};
  padding: 10px 0;
  margin: 0 0 10px;
  background-color: white;
  border: 1px solid lightgray;
`;
export const Logo = styled.img`
  width: 175px;
  height: 51px;
  margin: 22px 86px 12px;
`;
export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;
  height: fit-content;
`;
export const AuthFormInput = styled.input`
  box-sizing: border-box;
  height: 38px;
  margin: 0 40px 6px;
  padding: 9px 0 7px 8px;
  border: 1px solid lightgray;
  border-radius: 3px;
  background-color: whitesmoke;
  font-size: 12px;
  :focus {
    border: 1px solid gray;
    outline: none;
  }
`;
export const AuthFormSubmitBtn = styled.button`
  height: 30px;
  margin: 8px 40px;
  border: 0;
  border-radius: 4px;
  color: white;
  font-size: 13px;
  font-weight: 600;
  background-color: #0095f6;
  cursor: pointer;
`;
export const AltOption = styled.section`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 63px;
  padding: 10px 0;
  margin: 0 0 10px;
  background-color: white;
  border: 1px solid lightgray;
  font-size: 14px;
`;
export const AuthLinkStyle = styled(Link)`
  color: #0095f6;
  text-decoration: none;
  font-weight: 600;
`;

export default GlobalStyle;

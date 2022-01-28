/* eslint-disable react/jsx-no-useless-fragment */
import { ReactElement } from "react";
import { Wrapper, Header, Content, FooterContainer } from "./Layout_styles";

interface ILayoutProps {
  isAuth: boolean;
  auth: ReactElement;
  header: ReactElement;
  content: ReactElement;
  footer: ReactElement;
}

export default function Layout({
  isAuth,
  auth,
  header,
  content,
  footer,
}: ILayoutProps) {
  return (
    <>
      {isAuth ? (
        <Wrapper>
          <Header>{header}</Header>
          <Content>{content}</Content>
          <FooterContainer>{footer}</FooterContainer>
        </Wrapper>
      ) : (
        <>
          {auth}
          <FooterContainer>{footer}</FooterContainer>
        </>
      )}
    </>
  );
}

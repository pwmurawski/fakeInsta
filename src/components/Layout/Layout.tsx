/* eslint-disable react/jsx-no-useless-fragment */
import { ReactElement } from "react";
import useAuth from "../../hooks/useAuth";
import { Wrapper, Header, Content, FooterContainer } from "./Layout_styles";

interface ILayoutProps {
  auth: ReactElement;
  header: ReactElement;
  content: ReactElement;
  footer: ReactElement;
  modals: ReactElement;
}

export default function Layout({
  auth,
  header,
  content,
  footer,
  modals,
}: ILayoutProps) {
  const [isAuth] = useAuth();

  return (
    <>
      {isAuth?.token && isAuth.userId ? (
        <>
          <Wrapper>
            <Header>{header}</Header>
            <Content>{content}</Content>
            <FooterContainer>{footer}</FooterContainer>
          </Wrapper>
          {modals}
        </>
      ) : (
        <>
          <main>{auth}</main>
          <FooterContainer>{footer}</FooterContainer>
        </>
      )}
    </>
  );
}

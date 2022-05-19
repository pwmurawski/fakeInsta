/* eslint-disable react/jsx-no-useless-fragment */
import useAuth from "../../hooks/useAuth";
import { ILayoutProps } from "../../interfaces/interfaces";
import { Wrapper, Header, Content, FooterContainer } from "./Layout_styles";

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

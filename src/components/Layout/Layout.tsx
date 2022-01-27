import { ReactElement } from "react";
import { Wrapper, Header, Content, FooterContainer } from "./Layout_styles";

interface ILayoutProps {
  header: ReactElement;
  content: ReactElement;
  footer: ReactElement;
}

export default function Layout({ header, content, footer }: ILayoutProps) {
  return (
    <Wrapper>
      <Header>{header}</Header>
      <Content>{content}</Content>
      <FooterContainer>{footer}</FooterContainer>
    </Wrapper>
  );
}

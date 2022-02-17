import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import directImg from "../../../assets/direct.png";

const Content = styled.section`
  box-sizing: border-box;
  flex: 1;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 96px;
  height: 96px;
`;
const H2 = styled.h2`
  font-size: 22px;
  font-weight: 200;
  margin: 12px 0 0;
`;
const Desc = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: grey;
`;
const NewMessLink = styled(Link)`
  box-sizing: border-box;
  width: 134px;
  height: 30px;
  padding: 5px 9px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  color: white;
  margin-top: 24px;
  border-radius: 4px;
  background-color: rgb(0, 149, 246);
`;

export default function AddConversationInfo() {
  const { pathname }: { pathname: string } = useLocation();

  return (
    <Content>
      <Img src={directImg} />
      <H2>Twoje wiadomości</H2>
      <Desc>Wysyłaj prywatne zdjęcia i wiadomości do znajomego lub grupy.</Desc>
      <NewMessLink to="/direct/new/" state={{ background: pathname }}>
        Wyślij wiadomość
      </NewMessLink>
    </Content>
  );
}

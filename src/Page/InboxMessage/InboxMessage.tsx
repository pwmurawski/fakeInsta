import styled from "styled-components";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import directImg from "../../assets/direct.png";
import NewMessSvg from "../../components/SvgIcon/Direct_SvgIcon";
import Conversations from "../../components/Conversations/Conversations";
import userImg from "../../assets/user.jpg";
import ConversationContent from "../ConversationContent/ConversationContent";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  height: fit-content;
`;
const InboxContainer = styled.section`
  display: flex;
  max-width: 935px;
  width: 100%;
  height: 85vh;
  margin: 0 20px;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 4px;
  @media (max-width: 935px) {
    margin: 0;
  }
`;
const Container = styled.section`
  width: 350px;
  height: 100%;
  border-right: 1px solid lightgray;
  @media (max-width: 935px) {
    width: 300px;
  }
`;
const Header = styled.header`
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  display: flex;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid lightgray;
`;
const UserName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-weight: 600;
`;
const IconLink = styled(Link)`
  width: 24px;
  height: 24px;
`;
const ConversationsContainer = styled.section`
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  padding-top: 8px;
`;
const Title = styled.h4`
  box-sizing: border-box;
  width: 100%;
  height: 24px;
  padding: 0 20px;
  margin: 4px 0;
  font-size: 16px;
  font-weight: 500;
`;
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

interface ILocationState {
  pathname: string;
  state?: {
    background: string;
  };
}

export default function InboxMessage() {
  const { pathname, state } = useLocation() as ILocationState;
  const background = state?.background;
  const [conversationsData, setConversationsData] = useState([
    {
      id: 1,
      userName: "pwmurawski123",
      userImg,
    },
    {
      id: 2,
      userName: "simea",
      userImg,
    },
  ]);

  return (
    <Wrapper>
      <InboxContainer>
        <Container>
          <Header>
            <UserName>pwmurawski123</UserName>
            <IconLink to="/direct/new/" state={{ background: pathname }}>
              <NewMessSvg />
            </IconLink>
          </Header>
          <ConversationsContainer>
            <Title>Wiadomości</Title>
            <Conversations conversationsData={conversationsData} />
          </ConversationsContainer>
        </Container>
        <Routes location={background}>
          <Route
            path="inbox"
            element={
              <Content>
                <Img src={directImg} />
                <H2>Twoje wiadomości</H2>
                <Desc>
                  Wysyłaj prywatne zdjęcia i wiadomości do znajomego lub grupy.
                </Desc>
                <NewMessLink to="/direct/new/" state={{ background: pathname }}>
                  Wyślij wiadomość
                </NewMessLink>
              </Content>
            }
          />
          <Route path="t/:id" element={<ConversationContent />} />
        </Routes>
      </InboxContainer>
    </Wrapper>
  );
}

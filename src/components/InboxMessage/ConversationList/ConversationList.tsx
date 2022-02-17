import styled from "styled-components";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import userImg from "../../../assets/user.jpg";
import NewMessSvg from "../../../components/SvgIcon/Direct_SvgIcon";
import Conversations from "../../../components/InboxMessage/Conversations/Conversations";

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

export default function ConversationList() {
  const { pathname }: { pathname: string } = useLocation();
  const [conversationsData, setConversationsData] = useState([
    {
      id: 1,
      userName: "user1",
      userImg,
    },
    {
      id: 2,
      userName: "user2",
      userImg,
    },
  ]);

  return (
    <Container>
      <Header>
        <UserName>user</UserName>
        <IconLink to="/direct/new/" state={{ background: pathname }}>
          <NewMessSvg />
        </IconLink>
      </Header>
      <ConversationsContainer>
        <Title>Wiadomości</Title>
        <Conversations conversationsData={conversationsData} />
      </ConversationsContainer>
    </Container>
  );
}

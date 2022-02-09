import { useState } from "react";
import styled from "styled-components";
import userImg from "../../assets/user.jpg";
import UsersList from "../UsersList/UsersList";

const Wrapper = styled.div`
  position: fixed;
  width: 300px;
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  margin: 22px 0 10px 0;
`;
const Img = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 150px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-left: 20px;
`;
const UserName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: black;
`;
const UserFullName = styled.div`
  font-size: 14px;
  color: gray;
  font-weight: 400;
`;
const Info = styled.div`
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 600;
  color: gray;
  margin-top: 12px;
  padding: 4px 16px;
`;
const ProposedUsers = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IUsersList {
  id: string;
  userName: string;
  userFullName: string;
  userImg: string;
}

export default function Aside() {
  const [userList, setUserList] = useState<IUsersList[]>([
    {
      id: "1",
      userName: "user1",
      userFullName: "user1 user1",
      userImg,
    },
    {
      id: "2",
      userName: "user2",
      userFullName: "user2 user2",
      userImg,
    },
    {
      id: "3",
      userName: "user3",
      userFullName: "user3 user3",
      userImg,
    },
    {
      id: "4",
      userName: "user4",
      userFullName: "user4 user4",
      userImg,
    },
    {
      id: "5",
      userName: "user5",
      userFullName: "user5 user5",
      userImg,
    },
  ]);

  return (
    <Wrapper>
      <Header>
        <Img src={userImg} />
        <Container>
          <UserName>user1234</UserName>
          <UserFullName>user user</UserFullName>
        </Container>
      </Header>
      <Info>Propozycje dla Ciebie</Info>
      <ProposedUsers>
        <UsersList usersListData={userList} />
      </ProposedUsers>
    </Wrapper>
  );
}

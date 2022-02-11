import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import userImg from "../../assets/user.jpg";
import { UserLogo } from "../../GlobalStyle/GlobalStyle";
import Fetch from "../../helpers/Fetch/Fetch";
import objectToArray from "../../helpers/objectToArray";
import useAuth from "../../hooks/useAuth";
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
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-left: 20px;
`;
const UserName = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  color: black;
  text-decoration: none;
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

interface IUserData {
  userName: string;
  userFullName: string;
  logo?: string;
  storiesActive?: boolean;
}

export default function Aside() {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [auth] = useAuth();
  const [userData, setUserData] = useState<IUserData>({
    userName: "",
    userFullName: "",
  });
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

  const getUserAuthData = () => {
    if (auth) {
      Fetch(`users/${auth.userId}.json`, { signal }, (res) => {
        const newUserData: IUserData = objectToArray(res, false)[0];
        setUserData({
          userName: newUserData.userName,
          userFullName: newUserData.userFullName,
          logo: newUserData.logo,
          storiesActive: newUserData.storiesActive,
        });
      });
    }
  };

  useEffect(() => {
    getUserAuthData();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Wrapper>
      <Header>
        <Link to="/profile/">
          <UserLogo
            src={userData.logo ?? userImg}
            storiesActive={userData.storiesActive}
            width="56px"
            height="56px"
          />
        </Link>
        <Container>
          <UserName to="/profile/">{userData.userName}</UserName>
          <UserFullName>{userData.userFullName}</UserFullName>
        </Container>
      </Header>
      <Info>Propozycje dla Ciebie</Info>
      <ProposedUsers>
        <UsersList
          usersListData={userList}
          textInUser="Zobacz profil"
          userImgSize="32px"
          fontSize="12px"
        />
      </ProposedUsers>
    </Wrapper>
  );
}

import { useEffect, useState } from "react";
import styled from "styled-components";
import Fetch from "../../../helpers/Fetch/Fetch";
import objectToArray from "../../../helpers/objectToArray";
import useAuth from "../../../hooks/useAuth";
import UsersList from "../../UsersList/UsersList";
import AsideHeader from "./AsideHeader/AsideHeader";

const Wrapper = styled.div`
  position: fixed;
  width: 300px;
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
  userId: string;
  userName: string;
  userFullName: string;
  userImg?: string;
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
      userId: "1",
      userName: "user1",
      userFullName: "user1 user1",
    },
    {
      userId: "2",
      userName: "user2",
      userFullName: "user2 user2",
    },
    {
      userId: "3",
      userName: "user3",
      userFullName: "user3 user3",
    },
    {
      userId: "4",
      userName: "user4",
      userFullName: "user4 user4",
    },
    {
      userId: "5",
      userName: "user5",
      userFullName: "user5 user5",
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
      <AsideHeader userData={userData} />
      <Info>Propozycje dla Ciebie</Info>
      <ProposedUsers>
        <UsersList
          usersListData={userList}
          textInUser="Zobacz profil"
          userImgSize="32px"
          fontSize="12px"
          offLink
        />
      </ProposedUsers>
    </Wrapper>
  );
}

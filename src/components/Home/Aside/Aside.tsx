import { useState } from "react";
import styled from "styled-components";
import useUserAuthData from "../../../hooks/useUserAuthData";
import { IUserData, IUsersList } from "../../../interfaces/interfaces";
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

export default function Aside() {
  const [userData] = useUserAuthData<IUserData>();
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

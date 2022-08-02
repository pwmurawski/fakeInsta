/* eslint-disable react/jsx-no-useless-fragment */
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IProfileHeaderButtonsProps } from "../../../../interfaces/interfaces";

const FollowUserBtn = styled.button`
  box-sizing: border-box;
  width: 111px;
  height: 30px;
  padding: 0px 24px;
  margin-left: 20px;
  background-color: #0095f6;
  border: 0;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  color: white;
  text-align: center;
  text-decoration: none;
  cursor: pointer;

  @media (max-width: 735px) {
    max-width: 250px;
    width: 100%;
    margin: 0;
  }
`;
const AlreadyWatchedUserBtn = styled(FollowUserBtn)`
  background-color: transparent;
  width: 134px;
  padding: 5px 9px;
  color: black;
  border: 1px solid lightgray;

  :last-of-type {
    font-size: 11px;
    padding: 0;
  }

  @media (max-width: 735px) {
    max-width: 250px;
    width: 100%;
    margin: 0;
    margin-top: 2px;
    :last-of-type {
      margin-top: 2px;
    }
  }
`;
const UserEditLink = styled(Link)`
  box-sizing: border-box;
  width: 97px;
  height: 30px;
  padding: 4px 9px;
  margin-left: 20px;
  background: transparent;
  border: 1px solid lightgray;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  color: black;
  text-align: center;
  text-decoration: none;

  @media (max-width: 735px) {
    max-width: 250px;
    width: 100%;
    margin: 0;
  }
`;

const defaultProps = {
  profileUserNotAuth: false,
  userAuthWatched: undefined,
  userId: undefined,
  onFollow: undefined,
  onUnFollow: undefined,
};

export default function ProfileHeaderButtons({
  profileUserNotAuth,
  userAuthWatched,
  userId,
  onFollow,
  onUnFollow,
}: IProfileHeaderButtonsProps) {
  if (!profileUserNotAuth)
    return <UserEditLink to="/accounts/edit/">Edytuj profil</UserEditLink>;
  if (userAuthWatched?.includes(userId ?? "")) {
    return (
      <>
        <AlreadyWatchedUserBtn>Wyślij wiadomość</AlreadyWatchedUserBtn>
        <AlreadyWatchedUserBtn onClick={onUnFollow}>
          Przestań obserwować
        </AlreadyWatchedUserBtn>
      </>
    );
  }
  return <FollowUserBtn onClick={onFollow}>Obserwuj</FollowUserBtn>;
}

ProfileHeaderButtons.defaultProps = defaultProps;

/* eslint-disable no-unused-vars */
import { IUsersListProps } from "../../interfaces/interfaces";
import UserInList from "./UserInList/UserInList";

const defaultProps = {
  textInUser: null,
  userImgSize: null,
  fontSize: null,
  offLink: false,
  userInListOnClick: null,
};

export default function UsersList({
  usersListData,
  textInUser,
  userImgSize,
  fontSize,
  userInListOnClick,
  offLink,
}: IUsersListProps) {
  return (
    <>
      {usersListData.map((user) => (
        <UserInList
          key={user.userId}
          userId={user.userId}
          userName={user.userName}
          userFullName={user.userFullName}
          userImg={user.userImg}
          textInUser={textInUser}
          userImgSize={userImgSize}
          fontSize={fontSize}
          userInListOnClick={userInListOnClick}
          offLink={offLink}
        />
      ))}
    </>
  );
}

UsersList.defaultProps = defaultProps;

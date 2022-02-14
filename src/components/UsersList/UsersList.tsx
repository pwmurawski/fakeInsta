/* eslint-disable no-unused-vars */
import UserInList from "./UserInList/UserInList";

interface IUsersListProps {
  usersListData: {
    userId: string;
    userName: string;
    userFullName: string;
    userImg?: string;
  }[];
  textInUser?: string;
  userImgSize?: string;
  fontSize?: string;
  offLink?: boolean;
  userInListOnClick?: () => void;
}

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

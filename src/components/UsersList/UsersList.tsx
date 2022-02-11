import UserInList from "./UserInList/UserInList";

interface IUsersListProps {
  usersListData: {
    id: string;
    userName: string;
    userFullName: string;
    userImg: string;
  }[];
  textInUser?: string;
  userImgSize?: string;
  fontSize?: string;
}

const defaultProps = {
  textInUser: null,
  userImgSize: null,
  fontSize: null,
};

export default function UsersList({
  usersListData,
  textInUser,
  userImgSize,
  fontSize,
}: IUsersListProps) {
  return (
    <>
      {usersListData.map((user) => (
        <UserInList
          key={user.id}
          userName={user.userName}
          userFullName={user.userFullName}
          userImg={user.userImg}
          textInUser={textInUser}
          userImgSize={userImgSize}
          fontSize={fontSize}
        />
      ))}
    </>
  );
}

UsersList.defaultProps = defaultProps;

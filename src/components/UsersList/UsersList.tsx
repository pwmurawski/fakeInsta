import UserInList from "./UserInList/UserInList";

interface IUsersListProps {
  usersListData: {
    id: string;
    userName: string;
    userFullName: string;
    userImg: string;
  }[];
}
export default function UsersList({ usersListData }: IUsersListProps) {
  return (
    <>
      {usersListData.map((user) => (
        <UserInList
          key={user.id}
          userName={user.userName}
          userFullName={user.userFullName}
          userImg={user.userImg}
        />
      ))}
    </>
  );
}

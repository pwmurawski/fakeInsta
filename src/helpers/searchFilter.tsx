import { IUsersData } from "../interfaces/interfaces";

const searchFilter = (term: string, usersData: IUsersData[]): IUsersData[] => {
  const newUserData = usersData.filter(
    (user) =>
      user.userName.toLowerCase().includes(term.toLowerCase()) ||
      user.userFullName.toLowerCase().includes(term.toLowerCase())
  );
  return newUserData;
};

export default searchFilter;

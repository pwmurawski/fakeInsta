import { useEffect, useState } from "react";
import { fetchUsers } from "../api/userQuery";
import objectToArray from "../helpers/objectToArray";
import { IUsersData } from "../interfaces/interfaces";

const useAllUsers = () => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [usersData, setUsersData] = useState<IUsersData[]>([
    {
      userId: "",
      userName: "",
      userFullName: "",
    },
  ]);

  const getUsersData = async () => {
    const res = await fetchUsers(signal);
    if (res) {
      const users: IUsersData[] = objectToArray(res, false).flatMap((e) =>
        objectToArray(e)
      );
      setUsersData(users);
    }
  };

  useEffect(() => {
    getUsersData();

    return () => {
      abortController.abort();
    };
  }, []);

  return usersData;
};

export default useAllUsers;

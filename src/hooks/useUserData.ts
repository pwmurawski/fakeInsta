import { useEffect, useState } from "react";
import { fetchUser } from "../api/userQuery";
import objectToArray from "../helpers/objectToArray";
import { IUserData } from "../interfaces/interfaces";

const useUserData = (userId: string | undefined) => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [userData, setUserData] = useState<IUserData>({
    userFullName: "",
    userId: "",
    userName: "",
    logo: "",
    storiesActive: false,
  });

  const getUserData = async () => {
    if (userId) {
      const res = await fetchUser(userId, signal);
      if (res) {
        const user: IUserData = objectToArray(res, false)[0];
        setUserData(user);
      }
    }
  };

  useEffect(() => {
    getUserData();

    return () => {
      abortController.abort();
    };
  }, []);

  return userData;
};

export default useUserData;

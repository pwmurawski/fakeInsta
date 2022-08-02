import { useEffect, useState } from "react";
import { fetchUser } from "../api/userQuery";
import objectToArray from "../helpers/objectToArray";
import useAuth from "./useAuth";

const useUserAuthData = <T>(): [
  userAuthData: typeof userAuthData,
  setUserAuthData: typeof setUserAuthData
] => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [auth] = useAuth();
  const [userAuthData, setUserAuthData] = useState<T>();

  const getUserAuthData = async () => {
    if (auth) {
      const res = await fetchUser(auth.userId, signal);
      if (res) {
        const userData: T[] = objectToArray(res);
        setUserAuthData(userData[0]);
      }
    }
  };

  useEffect(() => {
    getUserAuthData();

    return () => {
      abortController.abort();
    };
  }, []);

  return [userAuthData, setUserAuthData];
};

export default useUserAuthData;

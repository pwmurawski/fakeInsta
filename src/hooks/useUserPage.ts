import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchAddToWatchedUsers,
  fetchDeleteToWatchedUsers,
  fetchUser,
} from "../api/userQuery";
import objectToArray from "../helpers/objectToArray";
import {
  IUserAuthDataUserProfil,
  IUserDataUserProfil,
} from "../interfaces/interfaces";

const useUserPage = (
  userAuthData: IUserAuthDataUserProfil | undefined,
  setUserAuthData: React.Dispatch<
    React.SetStateAction<IUserAuthDataUserProfil | undefined>
  >
): [
  userData: typeof userData,
  addToWatchedUsers: typeof addToWatchedUsers,
  deleteToWatchedUsers: typeof deleteToWatchedUsers
] => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const { userId } = useParams();
  const [userData, setUserData] = useState<IUserDataUserProfil>({
    email: "",
    userFullName: "",
    userName: "",
    userId: "",
  });

  const getUserData = async () => {
    if (userId) {
      const res = await fetchUser(userId, signal);
      if (res) {
        const user: IUserDataUserProfil[] = objectToArray(res, false);
        setUserData(user[0]);
      }
    }
  };

  const addToWatchedUsers = async () => {
    if (userAuthData) {
      const res = await fetchAddToWatchedUsers(
        userAuthData.userId,
        userAuthData.id,
        userId,
        userAuthData.usersWatched,
        signal
      );
      if (res) {
        setUserAuthData({ ...userAuthData, usersWatched: res });
      }
    }
  };

  const deleteToWatchedUsers = async () => {
    if (userAuthData) {
      const delUserWatch = userAuthData.usersWatched?.filter(
        (e) => e !== userId
      );

      const res = await fetchDeleteToWatchedUsers(
        userAuthData.userId,
        userAuthData.id,
        delUserWatch,
        signal
      );
      setUserAuthData({ ...userAuthData, usersWatched: res });
    }
  };

  useEffect(() => {
    getUserData();
  }, [userId]);

  return [userData, addToWatchedUsers, deleteToWatchedUsers];
};

export default useUserPage;

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import objectToArray from "../helpers/objectToArray";
import { fetchUser } from "../api/userQuery";
import { fetchCreateNewPost } from "../api/postQuery";
import {
  ILocationStateNewPost,
  IPostData,
  IUserAuth,
} from "../interfaces/interfaces";

const useAddPost = (): [
  newPostData: typeof newPostData,
  setNewPostData: typeof setNewPostData,
  addPost: typeof addPost
] => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const { state } = useLocation() as ILocationStateNewPost;
  const [auth] = useAuth();
  const actualTime = new Date();
  const [newPostData, setNewPostData] = useState<IPostData>({
    img: state?.uploadImg,
    desc: "",
    location: "",
    date: actualTime,
    user: {
      userFullName: "",
      userId: "",
      userName: "",
    },
  });

  const getUserAuth = async () => {
    if (auth) {
      const res = await fetchUser(auth.userId, signal);

      if (res) {
        const user: IUserAuth[] = objectToArray(res);
        setNewPostData({
          ...newPostData,
          user: {
            userFullName: user[0].userFullName,
            userId: user[0].userId,
            userName: user[0].userName,
            logo: user[0].logo,
            storiesActive: user[0].storiesActive,
          },
        });
      }
    }
  };

  const addPost = () => {
    if (auth) {
      fetchCreateNewPost(auth.userId, newPostData, signal);
    }
  };

  useEffect(() => {
    getUserAuth();

    return () => {
      abortController.abort();
    };
  }, []);

  return [newPostData, setNewPostData, addPost];
};

export default useAddPost;

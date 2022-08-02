import { useEffect, useState } from "react";
import objectToArray from "../helpers/objectToArray";
import useAuth from "../hooks/useAuth";
import { fetchPosts, fetchUserPosts } from "../api/postQuery";
import { fetchUser } from "../api/userQuery";
import { IPostsData } from "../interfaces/interfaces";

const useHomePosts = (): [
  loading: typeof loading,
  numberWatchedUser: typeof numberWatchedUser,
  postsData: typeof postsData
] => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);
  const [numberWatchedUser, setNumberWatchedUser] = useState(0);
  const [postsData, setPostsData] = useState<IPostsData[]>([]);

  const getPostsAuthUser = async () => {
    if (auth) {
      const res = await fetchUserPosts(auth.userId, signal);

      if (res) {
        const posts: IPostsData[] = objectToArray(res);
        setPostsData((prev) => [...prev, ...posts]);
        setLoading(false);
      }
    }
  };

  const getPostsWatchedUsers = async () => {
    if (auth) {
      const resp = await fetchUser(auth.userId, signal);
      if (resp) {
        const { usersWatched }: { usersWatched?: string[] } =
          objectToArray(resp)[0];
        setNumberWatchedUser(usersWatched?.length ?? 0);
        setLoading(true);

        const res = await fetchPosts(signal);
        if (res) {
          const posts = objectToArray(res, false).flatMap((e) =>
            objectToArray(e)
          );
          const newPostsDataWatchedUsers: IPostsData[][] = [];
          usersWatched?.forEach((idUserWatched) => {
            newPostsDataWatchedUsers.push(
              posts.filter((post) => post.user.userId === idUserWatched)
            );
          });
          setPostsData((prev) => [...prev, ...newPostsDataWatchedUsers.flat()]);
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    getPostsAuthUser();
    getPostsWatchedUsers();

    return () => {
      abortController.abort();
    };
  }, []);

  return [loading, numberWatchedUser, postsData];
};

export default useHomePosts;

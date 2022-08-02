import { useEffect, useState } from "react";
import { fetchUserPosts } from "../api/postQuery";
import objectToArray from "../helpers/objectToArray";
import { IPostsDataProfile } from "../interfaces/interfaces";
import useAuth from "./useAuth";

const usePostsUserAuth = (): [
  postsData: typeof postsData,
  loading: typeof loading
] => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);
  const [postsData, setPostsData] = useState<IPostsDataProfile[]>([]);

  const getPostsData = async () => {
    if (auth) {
      const res = await fetchUserPosts(auth.userId, signal);
      const posts: IPostsDataProfile[] = objectToArray(res);
      setPostsData(posts);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostsData();

    return () => {
      abortController.abort();
    };
  }, []);

  return [postsData, loading];
};

export default usePostsUserAuth;

import { useEffect, useState } from "react";
import objectToArray from "../helpers/objectToArray";
import { fetchPosts } from "../api/postQuery";
import { IPostsDataProfile } from "../interfaces/interfaces";

const useAllPosts = (): [
  postsData: typeof postsData,
  loading: typeof loading
] => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [loading, setLoading] = useState(true);
  const [postsData, setPostsData] = useState<IPostsDataProfile[]>([]);

  const getPosts = async () => {
    const res = await fetchPosts(signal);
    if (res) {
      const posts = objectToArray(res, false).flatMap((e) => objectToArray(e));
      setPostsData(posts);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();

    return () => {
      abortController.abort();
    };
  }, []);

  return [postsData, loading];
};

export default useAllPosts;

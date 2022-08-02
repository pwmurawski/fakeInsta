import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserPosts } from "../api/postQuery";
import objectToArray from "../helpers/objectToArray";
import { IPostsDataProfile } from "../interfaces/interfaces";

const usePostUserPage = (): [
  postsData: typeof postsData,
  loading: typeof loading
] => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [postsData, setPostsData] = useState<IPostsDataProfile[]>([]);

  const getPostsData = async () => {
    if (userId) {
      const res = await fetchUserPosts(userId, signal);

      const posts: IPostsDataProfile[] = objectToArray(res);
      setPostsData(posts);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getPostsData();
  }, [userId]);

  return [postsData, loading];
};

export default usePostUserPage;

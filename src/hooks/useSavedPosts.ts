import { useEffect, useState } from "react";
import { fetchPosts } from "../api/postQuery";
import objectToArray from "../helpers/objectToArray";
import {
  IPostsDataProfile,
  IUserAuthDataProfile,
} from "../interfaces/interfaces";

const useSavedPosts = (
  userAuthData: IUserAuthDataProfile | undefined
): [
  postsSavedData: typeof postsSavedData,
  loadingSaved: typeof loadingSaved
] => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [loadingSaved, setLoadingSaved] = useState(true);
  const [postsSavedData, setPostsSavedData] = useState<IPostsDataProfile[]>([]);

  const getSavedPosts = async () => {
    const res = await fetchPosts(signal);

    const posts = objectToArray(res, false).flatMap((e) => objectToArray(e));
    const newSavedPosts: IPostsDataProfile[][] = [];
    userAuthData?.savedPosts?.forEach((idSavedPost) => {
      newSavedPosts.push(posts.filter((post) => post.id === idSavedPost));
    });
    setPostsSavedData([...postsSavedData, ...newSavedPosts.flat()]);
    setLoadingSaved(false);
  };

  useEffect(() => {
    if (userAuthData?.savedPosts) {
      getSavedPosts();
    } else if (userAuthData?.userId) {
      setLoadingSaved(false);
    }
  }, [userAuthData?.userId]);

  return [postsSavedData, loadingSaved];
};

export default useSavedPosts;

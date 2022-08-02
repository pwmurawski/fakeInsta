import { useEffect, useState } from "react";
import { fetchCommentsPost } from "../api/commentQuery";
import { ICommentData } from "../interfaces/interfaces";
import objectToArray from "../helpers/objectToArray";

const useCommentData = (
  postId: string | undefined
): [
  commentsData: typeof commentsData,
  setCommentsData: typeof setCommentsData
] => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [commentsData, setCommentsData] = useState<ICommentData[]>([]);

  const getCommentsData = async () => {
    if (postId) {
      const res = await fetchCommentsPost(postId, signal);
      if (res) {
        const newCommentsData: ICommentData[] = objectToArray(res);
        setCommentsData(newCommentsData);
      }
    }
  };

  useEffect(() => {
    getCommentsData();

    return () => {
      abortController.abort();
    };
  }, []);

  return [commentsData, setCommentsData];
};

export default useCommentData;

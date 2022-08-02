import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPost } from "../api/postQuery";
import { IPostDataPost } from "../interfaces/interfaces";

const usePostPage = (): [
  postData: typeof postData,
  loading: typeof loading
] => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const { userId, postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState<IPostDataPost>({
    img: "",
    desc: "",
    date: "",
    likes: [],
    location: "",
  });

  const getPostData = async () => {
    if (postId && userId) {
      const res = await fetchPost(postId, userId, signal);
      if (res) {
        const post: IPostDataPost = res;
        setPostData(post);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getPostData();

    return () => {
      abortController.abort();
    };
  }, []);

  return [postData, loading];
};

export default usePostPage;

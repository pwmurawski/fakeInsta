import { fetchUser } from "../api/userQuery";
import objectToArray from "../helpers/objectToArray";
import useAuth from "../hooks/useAuth";

import { fetchAddComment } from "../api/commentQuery";

import { ICommentData, IUserData } from "../interfaces/interfaces";

const useAddComment = (
  postId: string | undefined,
  setCommentsData?: React.Dispatch<React.SetStateAction<ICommentData[]>>
) => {
  const [auth] = useAuth();

  const addComment = async (
    newContent: string,
    setNewContent: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (auth) {
      const res = await fetchUser(auth.userId);
      if (res) {
        const userAuthData: IUserData = objectToArray(res, false)[0];
        const newCommentData = {
          user: {
            userId: auth.userId,
            userName: userAuthData.userName,
            userLogo: userAuthData.logo,
            storiesActive: userAuthData.storiesActive,
          },
          content: newContent,
        };

        if (postId) {
          const resp = await fetchAddComment(postId, newCommentData);
          if (resp && setCommentsData) {
            setCommentsData((state) => [
              ...state,
              { ...newCommentData, id: resp.name },
            ]);
          }
        }
      }
      setNewContent("");
    }
  };

  return addComment;
};

export default useAddComment;

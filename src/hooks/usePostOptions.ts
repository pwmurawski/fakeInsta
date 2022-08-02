import { fetchLikeHandlerePost, fetchSavedPostHandler } from "../api/postQuery";
import { fetchUser } from "../api/userQuery";
import objectToArray from "../helpers/objectToArray";
import { IUserAuthData } from "../interfaces/interfaces";
import useAuth from "./useAuth";

const usePostOptions = (
  postId: string | undefined,
  userId: string | undefined,
  likesData: string[] | undefined,
  setLikesData: React.Dispatch<React.SetStateAction<string[] | undefined>>,
  userAuthData: IUserAuthData | undefined,
  setUserAuthData: React.Dispatch<
    React.SetStateAction<IUserAuthData | undefined>
  >
): [likeHandler: typeof likeHandler, savedHandler: typeof savedHandler] => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [auth] = useAuth();

  const likeHandler = async () => {
    if (userId && postId && auth) {
      if (!likesData?.includes(auth.userId)) {
        const res = await fetchLikeHandlerePost(
          postId,
          userId,
          [...(likesData ?? []), auth.userId],
          signal
        );
        if (res) {
          setLikesData(res);
        }
      } else {
        const res = await fetchLikeHandlerePost(
          postId,
          userId,
          likesData.filter((id) => id !== auth.userId),
          signal
        );
        setLikesData(res);
      }
    }
  };

  const savedHandler = async () => {
    if (postId && auth && userAuthData) {
      if (!userAuthData.savedPosts?.includes(postId)) {
        const res = await fetchUser(auth.userId, signal);
        if (res) {
          const newUserAuthData: IUserAuthData = objectToArray(res)[0];

          const resp = await fetchSavedPostHandler(
            auth.userId,
            userAuthData.id,
            [...(newUserAuthData.savedPosts ?? []), postId],
            signal
          );
          if (resp) {
            setUserAuthData({
              ...userAuthData,
              savedPosts: resp,
            });
          }
        }
      } else {
        const res = await fetchUser(auth.userId, signal);
        if (res) {
          const newUserAuthData: IUserAuthData = objectToArray(res)[0];

          const resp = await fetchSavedPostHandler(
            auth.userId,
            userAuthData.id,
            newUserAuthData.savedPosts?.filter((e) => e !== postId),
            signal
          );
          setUserAuthData({
            ...userAuthData,
            savedPosts: resp,
          });
        }
      }
    }
  };

  return [likeHandler, savedHandler];
};

export default usePostOptions;

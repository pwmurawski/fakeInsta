import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Options, Btn, BtnRight } from "./PostOptions_styles";
import {
  LikeSvg,
  CommentSvg,
  ShareSvg,
  SavePostSvg,
  NotLikeSvg,
  SavedPostSvg,
} from "../../../../SvgIcon/PostOptions_SvgIcon";
import useAuth from "../../../../../hooks/useAuth";
import objectToArray from "../../../../../helpers/objectToArray";
import { fetchUser } from "../../../../../api/userQuery";
import {
  fetchLikeHandlerePost,
  fetchSavedPostHandler,
} from "../../../../../api/postQuery";
import {
  IPostOptionsProps,
  IUserAuthData,
} from "../../../../../interfaces/interfaces";

const defaultProps = {
  commentBtnOff: false,
  postId: null,
  userId: null,
  likesData: null,
};

export default function PostOptions({
  postId,
  userId,
  likesData,
  setLikesData,
  commentBtnOff,
}: IPostOptionsProps) {
  const abortController = new AbortController();
  const { signal } = abortController;
  const { pathname } = useLocation();
  const [auth] = useAuth();
  const [userAuthData, setUserAuthData] = useState<IUserAuthData>({
    id: "",
  });

  const getUserAuthData = async () => {
    if (auth) {
      const res = await fetchUser(auth.userId, signal);
      if (res) {
        const newUserAuthData: IUserAuthData = objectToArray(res)[0];
        setUserAuthData({
          id: newUserAuthData.id,
          savedPosts: newUserAuthData.savedPosts,
        });
      }
    }
  };

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
    if (postId && auth) {
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

  useEffect(() => {
    getUserAuthData();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Options>
      <Btn onClick={likeHandler}>
        {likesData?.includes(auth?.userId ?? "null") ? (
          <NotLikeSvg />
        ) : (
          <LikeSvg />
        )}
      </Btn>
      <Btn>
        {commentBtnOff ? (
          <CommentSvg />
        ) : (
          <Link
            to={`/p/${userId}/${postId}/false/`}
            state={{ background: pathname }}
          >
            <CommentSvg />
          </Link>
        )}
      </Btn>
      <Btn>
        <ShareSvg />
      </Btn>
      <BtnRight>
        <Btn onClick={savedHandler}>
          {userAuthData.savedPosts?.includes(postId ?? "") ? (
            <SavedPostSvg />
          ) : (
            <SavePostSvg />
          )}
        </Btn>
      </BtnRight>
    </Options>
  );
}

PostOptions.defaultProps = defaultProps;

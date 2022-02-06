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
} from "../../../SvgIcon/PostOptions_SvgIcon";
import useAuth from "../../../../hooks/useAuth";
import Fetch from "../../../../helpers/Fetch/Fetch";
import objectToArray from "../../../../helpers/objectToArray";

interface IUserAuthData {
  id: string;
  savedPosts?: string[];
}

interface IPostOptionsProps {
  postId?: string;
  userId?: string;
  likesData?: string[];
  setLikesData: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  commentBtnOff?: boolean;
}

const defaultProps = {
  commentBtnOff: false,
  postId: undefined,
  userId: undefined,
  likesData: [],
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

  const getUserAuthData = () => {
    Fetch(`users/${auth?.userId}.json`, { signal }, (res) => {
      const newUserAuthData: IUserAuthData = objectToArray(res)[0];
      setUserAuthData({
        id: newUserAuthData.id,
        savedPosts: newUserAuthData.savedPosts,
      });
    });
  };

  const likeHandler = () => {
    if (!likesData?.includes(auth?.userId ?? "")) {
      if (userId && postId) {
        Fetch(
          `posts/${userId}/${postId}/likes.json`,
          {
            method: "PUT",
            signal,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify([...(likesData ?? []), auth?.userId]),
          },
          (res) => {
            setLikesData(res);
          }
        );
      }
    } else {
      Fetch(
        `posts/${userId}/${postId}/likes.json`,
        {
          method: "PUT",
          signal,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(likesData?.filter((id) => id !== auth?.userId)),
        },
        (res) => {
          setLikesData(res);
        }
      );
    }
  };

  const savedHandler = () => {
    if (!userAuthData.savedPosts?.includes(postId ?? "")) {
      Fetch(`users/${auth?.userId}.json`, { signal }, (res) => {
        const newUserAuthData: IUserAuthData = objectToArray(res)[0];

        Fetch(
          `users/${auth?.userId}/${userAuthData.id}/savedPosts.json`,
          {
            method: "PUT",
            signal,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify([
              ...(newUserAuthData.savedPosts ?? []),
              postId,
            ]),
          },
          (resp) => {
            setUserAuthData({
              ...userAuthData,
              savedPosts: resp,
            });
          }
        );
      });
    } else {
      Fetch(`users/${auth?.userId}.json`, { signal }, (res) => {
        const newUserAuthData: IUserAuthData = objectToArray(res)[0];

        Fetch(
          `users/${auth?.userId}/${userAuthData.id}/savedPosts.json`,
          {
            method: "PUT",
            signal,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              newUserAuthData.savedPosts?.filter((e) => e !== postId)
            ),
          },
          (resp) => {
            setUserAuthData({
              ...userAuthData,
              savedPosts: resp,
            });
          }
        );
      });
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
        {likesData?.includes(auth?.userId ?? "") ? <NotLikeSvg /> : <LikeSvg />}
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

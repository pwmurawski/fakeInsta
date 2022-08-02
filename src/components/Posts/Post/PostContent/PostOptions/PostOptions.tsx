import { Link, useLocation } from "react-router-dom";
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
import {
  IPostOptionsProps,
  IUserAuthData,
} from "../../../../../interfaces/interfaces";
import useUserAuthData from "../../../../../hooks/useUserAuthData";
import usePostOptions from "../../../../../hooks/usePostOptions";

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
  const { pathname } = useLocation();
  const [auth] = useAuth();
  const [userAuthData, setUserAuthData] = useUserAuthData<IUserAuthData>();
  const [likeHandler, savedHandler] = usePostOptions(
    postId,
    userId,
    likesData,
    setLikesData,
    userAuthData,
    setUserAuthData
  );

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
          {userAuthData?.savedPosts?.includes(postId ?? "") ? (
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

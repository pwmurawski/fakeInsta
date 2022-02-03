import { Link, useLocation } from "react-router-dom";
import { Options, Btn, BtnRight } from "./PostOptions_styles";
import {
  LikeSvg,
  CommentSvg,
  ShareSvg,
  SavePostSvg,
  NotLikeSvg,
} from "../../../SvgIcon/PostOptions_SvgIcon";
import useAuth from "../../../../hooks/useAuth";
import Fetch from "../../../../helpers/Fetch/Fetch";

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
  const { pathname } = useLocation();
  const [auth] = useAuth();

  const addLike = () => {
    if (!likesData?.includes(auth?.userId ?? "")) {
      if (userId && postId) {
        Fetch(
          `posts/${userId}/${postId}/likes.json`,
          {
            method: "PUT",
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

  return (
    <Options>
      <Btn onClick={addLike}>
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
        <Btn>
          <SavePostSvg />
        </Btn>
      </BtnRight>
    </Options>
  );
}

PostOptions.defaultProps = defaultProps;

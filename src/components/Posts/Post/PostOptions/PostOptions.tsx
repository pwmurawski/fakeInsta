import { Link, useLocation } from "react-router-dom";
import { Options, Btn, BtnRight } from "./PostOptions_styles";
import {
  LikeSvg,
  CommentSvg,
  ShareSvg,
  SavePostSvg,
} from "../../../SvgIcon/PostOptions_SvgIcon";

interface IPostOptionsProps {
  postId: number;
  commentBtnOff?: boolean;
}

const defaultProps = {
  commentBtnOff: false,
};

export default function PostOptions({
  postId,
  commentBtnOff,
}: IPostOptionsProps) {
  const { pathname } = useLocation();

  return (
    <Options>
      <Btn>
        <LikeSvg />
      </Btn>
      <Btn>
        {commentBtnOff ? (
          <CommentSvg />
        ) : (
          <Link to={`/p/${postId}/`} state={{ background: pathname }}>
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

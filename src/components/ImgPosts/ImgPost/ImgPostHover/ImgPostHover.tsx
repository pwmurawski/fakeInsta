import styled from "styled-components";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NotLikeSvg } from "../../../SvgIcon/PostOptions_SvgIcon";

const Hover = styled(Link)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  width: 100%;
  height: 100%;
  color: white;
  text-decoration: none;
  cursor: pointer;
  :hover,
  :focus {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;
const LikeHover = styled.p`
  margin: 0 0 5px 15px;
  font-size: 20px;
`;

interface IImgPostHoverProps {
  userId: string;
  id: string;
  likes?: string[];
}

const defaultProps = {
  likes: null,
};

export default function ImgPostHover({
  userId,
  id,
  likes,
}: IImgPostHoverProps) {
  const { pathname } = useLocation();
  const [isHover, setIsHover] = useState(false);

  return (
    <Hover
      to={`/p/${userId}/${id}/true/`}
      state={{ background: pathname }}
      onFocus={() => setIsHover(true)}
      onMouseEnter={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      {isHover ? (
        <>
          <NotLikeSvg />
          <LikeHover>{likes?.length}</LikeHover>
        </>
      ) : null}
    </Hover>
  );
}

ImgPostHover.defaultProps = defaultProps;

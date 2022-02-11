import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { NotLikeSvg } from "../../SvgIcon/PostOptions_SvgIcon";

const ImgContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 293px;
  width: 100%;
  min-width: 100%;
  max-height: 293px;
  height: 100%;
  min-height: 100%;
  background-color: black;
`;
const Img = styled.img`
  max-width: 100%;
  height: auto;
`;
const ImgPostContainer = styled.article`
  overflow: hidden;
  position: relative;
  ${({ customLayOut }: { customLayOut?: boolean }) =>
    customLayOut &&
    css`
      :nth-child(8n + 2) {
        grid-column: span 2;
        grid-row: span 2;

        ${ImgContainer} {
          max-width: 614px;
          width: 100%;
          min-width: 100%;
          max-height: 614px;
          height: 100%;
          min-height: 100%;
        }
      }
    `}
`;
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

interface IImgPostProps {
  id: string;
  img: string;
  likes?: string[];
  userId: string;
  customLayOut?: boolean;
}

const defaultProps = {
  customLayOut: undefined,
  likes: [],
};

export default function ImgPost({
  id,
  img,
  likes,
  userId,
  customLayOut,
}: IImgPostProps) {
  const { pathname } = useLocation();
  const [isHover, setIsHover] = useState(false);

  return (
    <ImgPostContainer customLayOut={customLayOut}>
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
      <ImgContainer>
        <Img src={img} />
      </ImgContainer>
    </ImgPostContainer>
  );
}

ImgPost.defaultProps = defaultProps;

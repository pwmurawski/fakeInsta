import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";

const ImgContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 293px;
  height: 100%;
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
          max-height: 100%;
        }
      }
    `}
`;
interface IHoverProps {
  likes?: number;
  comments?: number;
}
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
    ::before {
      font-size: 15px;
      content: "${({ likes, comments }: IHoverProps) =>
        `🤍 ${likes} 🗨️ ${comments}`}";
    }
  }
`;

interface IImgPostProps {
  id: string;
  img: string;
  likes?: string[];
  comments?: string[];
  userId: string;
  customLayOut?: boolean;
}

const defaultProps = {
  customLayOut: undefined,
  likes: [],
  comments: [],
};

export default function ImgPost({
  id,
  img,
  likes,
  comments,
  userId,
  customLayOut,
}: IImgPostProps) {
  const { pathname } = useLocation();

  return (
    <ImgPostContainer customLayOut={customLayOut}>
      <Hover
        to={`/p/${userId}/${id}/true/`}
        state={{ background: pathname }}
        likes={likes?.length}
        comments={comments?.length}
      />
      <ImgContainer>
        <Img src={img} />
      </ImgContainer>
    </ImgPostContainer>
  );
}

ImgPost.defaultProps = defaultProps;

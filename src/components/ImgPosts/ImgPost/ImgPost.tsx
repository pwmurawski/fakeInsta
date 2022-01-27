import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";

const ImgContainer = styled.div`
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
const ImgPostContainer = styled.div`
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
  likes: number;
  comments: number;
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
  id: number;
  img: string;
  likes: number;
  comments: number;
  customLayOut?: boolean;
}

const defaultProps = {
  customLayOut: undefined,
};

export default function ImgPost({
  id,
  img,
  likes,
  comments,
  customLayOut,
}: IImgPostProps) {
  const { pathname } = useLocation();

  return (
    <ImgPostContainer customLayOut={customLayOut}>
      <Hover
        to={`/p/${id}/`}
        state={{ background: pathname }}
        likes={likes}
        comments={comments}
      />
      <ImgContainer>
        <Img src={img} />
      </ImgContainer>
    </ImgPostContainer>
  );
}

ImgPost.defaultProps = defaultProps;

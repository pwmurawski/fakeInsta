import styled, { css } from "styled-components";
import { IImgPostProps } from "../../../interfaces/interfaces";
import ImgPostHover from "./ImgPostHover/ImgPostHover";

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
  return (
    <ImgPostContainer customLayOut={customLayOut}>
      <ImgPostHover id={id} userId={userId} likes={likes} />
      <ImgContainer>
        <Img src={img} />
      </ImgContainer>
    </ImgPostContainer>
  );
}

ImgPost.defaultProps = defaultProps;

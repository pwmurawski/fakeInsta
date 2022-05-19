/* eslint-disable no-unused-vars */
import styled, { css } from "styled-components";
import { IPostImgProps } from "../../../../interfaces/interfaces";

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  background-color: black;
  @media (max-width: 760px) {
    flex: 1;
  }
  ${({ postImg }: { postImg?: boolean }) =>
    postImg &&
    css`
      @media (max-width: 760px) {
        display: none;
      }
    `}
`;
const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  height: auto;
  cursor: pointer;
`;

const defaultProps = {
  postImg: null,
};

export default function PostImg({ image, postImg, onClick }: IPostImgProps) {
  return (
    <ImgContainer postImg={postImg !== "true"}>
      <Img onClick={onClick} src={image} />
    </ImgContainer>
  );
}

PostImg.defaultProps = defaultProps;

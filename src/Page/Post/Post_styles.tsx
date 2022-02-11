import styled, { css } from "styled-components";

export const PostContainer = styled.article`
  display: flex;
  max-width: 100%;
  width: fit-content;
  max-height: 100%;
  height: 100%;
  min-height: 60%;
  background-color: white;
  border-radius: 3px;
  transition: max-height 1000ms;
  position: relative;

  @media (max-width: 1389px) {
    max-height: 95%;
  }

  @media (max-width: 1000px) {
    max-height: 80%;
  }

  @media (max-width: 760px) {
    width: ${({ postImg }: { postImg?: boolean }) =>
      postImg ? "100%" : "90%"};
  }
`;
export const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  height: auto;
  cursor: pointer;
`;
export const ImgContainer = styled.div`
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
export const Content = styled.section`
  min-width: 404px;
  height: 100%;
  position: relative;
  @media (max-width: 760px) {
    flex: 2;
    min-width: 0;
  }
  ${({ postImg }: { postImg?: boolean }) =>
    postImg &&
    css`
      @media (max-width: 760px) {
        max-width: 100%;
        width: 100%;
        min-width: 0;
      }
    `}
`;

export const ContainerOptions = styled.div`
  width: 100%;
`;

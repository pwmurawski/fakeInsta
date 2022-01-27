import styled from "styled-components";
import { DescriptionPost } from "../../GlobalStyle/GlobalStyle";

export const PostContainer = styled.article`
  display: flex;
  max-width: 100%;
  width: fit-content;
  height: 100%;
  max-height: 100%;
  min-height: 60%;
  background-color: white;
  border-radius: 3px;
  transition: max-height 1000ms;

  @media (max-width: 1389px) {
    max-height: 95%;
  }

  @media (max-width: 1000px) {
    max-height: 80%;
  }

  @media (max-width: 760px) {
    height: fit-content;
  }
`;
export const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  background-color: black;
`;
export const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  height: auto;
`;
export const Content = styled.section`
  max-width: 100%;
  width: 500px;
  min-width: 400px;
  height: 100%;
  position: relative;

  @media (max-width: 760px) {
    width: 100%;
    min-width: 0;
  }
`;

export const ContainerOptions = styled.div`
  width: 100%;
`;

const heightHeader = "70px";
const heightContainerOptions = "160px";
export const CommentsContainer = styled.section`
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - ${heightHeader} - ${heightContainerOptions});
  padding: 16px;
  border-top: 1px solid lightgray;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0;
  }
`;

export const DescriptionPostPage = styled(DescriptionPost)`
  padding: 0;
`;

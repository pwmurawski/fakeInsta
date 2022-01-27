import styled from "styled-components";
import { TimeContainer } from "../../../GlobalStyle/GlobalStyle";

export const Wrapper = styled.article`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
  margin-bottom: 24px;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 3px;
`;
export const Img = styled.img`
  min-height: 200px;
  background-color: whitesmoke;
  cursor: pointer;
`;
export const Content = styled.section``;
export const CommentsLink = styled(TimeContainer)`
  font-size: 14px;
  color: gray;
  text-decoration: none;
`;

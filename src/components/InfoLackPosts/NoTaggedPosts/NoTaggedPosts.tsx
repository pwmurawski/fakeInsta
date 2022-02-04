import styled from "styled-components";
import noTaggedPostsImg from "../../../assets/tagged.png";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
  margin-top: 60px;
`;
const Img = styled.img`
  width: 62px;
  height: 62px;
`;
const H1 = styled.h1`
  font-size: 28px;
  font-weight: 300;
  margin: 10px 0 10px;
`;
const Desc = styled.span`
  text-align: center;
  width: 350px;
  font-size: 14px;
`;

export default function NoTaggedPosts() {
  return (
    <Wrapper>
      <Img src={noTaggedPostsImg} />
      <H1>Zdjęcia, na których jesteś</H1>
      <Desc>Jeżeli ktoś oznaczy Cię na zdjęciach, pojawią się one tutaj.</Desc>
    </Wrapper>
  );
}

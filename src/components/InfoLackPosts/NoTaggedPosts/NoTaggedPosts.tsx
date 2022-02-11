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

const defaultProps = {
  profileUserNotAuth: false,
};

export default function NoTaggedPosts({
  profileUserNotAuth,
}: {
  profileUserNotAuth?: boolean;
}) {
  return (
    <Wrapper>
      <Img src={noTaggedPostsImg} />
      <H1>
        {profileUserNotAuth
          ? "Zdjęcia, na których został oznaczony użytkownik"
          : "Zdjęcia, na których jesteś"}
      </H1>
      <Desc>
        {profileUserNotAuth
          ? "Jeżeli ktoś oznaczy użytkownika na zdjęciach, pojawią się one tutaj."
          : "Jeżeli ktoś oznaczy Cię na zdjęciach, pojawią się one tutaj."}
      </Desc>
    </Wrapper>
  );
}

NoTaggedPosts.defaultProps = defaultProps;

import styled from "styled-components";
import { IImgPostsProps } from "../../interfaces/interfaces";
import ImgPost from "./ImgPost/ImgPost";

const ImgPostsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 293px));
  grid-auto-flow: dense;
  grid-gap: 28px;
  margin-bottom: 20px;
  transition: grid-gap 500ms margin-bottom 500ms;

  @media (max-width: 915px) {
    grid-gap: 10px;
    margin-bottom: 10px;
  }
  @media (max-width: 775px) {
    grid-gap: 2px;
    margin-bottom: 2px;
  }
`;

const defaultProps = {
  customLayOut: undefined,
};

export default function ImgPosts({ postsData, customLayOut }: IImgPostsProps) {
  return (
    <ImgPostsContainer>
      {postsData.map((post) => (
        <ImgPost
          key={post.id}
          id={post.id}
          userId={post.user.userId}
          img={post.img}
          likes={post.likes}
          customLayOut={customLayOut}
        />
      ))}
    </ImgPostsContainer>
  );
}

ImgPosts.defaultProps = defaultProps;

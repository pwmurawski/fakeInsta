import styled from "styled-components";
import { useState } from "react";
import ImgPosts from "../../components/ImgPosts/ImgPosts";
import img from "../../assets/2.jpg";
import img2 from "../../assets/3.jpg";
import img3 from "../../assets/1.jpg";

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: fit-content;
  justify-content: center;
`;
const Container = styled.section`
  width: fit-content;
  padding: 0 20px;
  @media (max-width: 735px) {
    padding: 0;
  }
`;

export default function Explore() {
  const [postsData, setPostsData] = useState([
    {
      id: 1,
      img,
      likes: 64,
      comments: 32,
    },
    {
      id: 2,
      img: img2,
      likes: 345,
      comments: 45,
    },
    {
      id: 3,
      img,
      likes: 789,
      comments: 543,
    },
    {
      id: 4,
      img: img2,
      likes: 123,
      comments: 89,
    },
    {
      id: 5,
      img,
      likes: 917,
      comments: 132,
    },
    {
      id: 6,
      img: img3,
      likes: 999,
      comments: 129,
    },
    {
      id: 7,
      img,
      likes: 83,
      comments: 89,
    },
    {
      id: 8,
      img,
      likes: 433,
      comments: 89,
    },
    {
      id: 9,
      img: img2,
      likes: 123,
      comments: 89,
    },
    {
      id: 10,
      img: img2,
      likes: 1221,
      comments: 829,
    },
    {
      id: 11,
      img: img2,
      likes: 3,
      comments: 19,
    },
    {
      id: 12,
      img: img3,
      likes: 123,
      comments: 89,
    },
  ]);

  return (
    <Wrapper>
      <Container>
        <ImgPosts postsData={postsData} customLayOut />
      </Container>
    </Wrapper>
  );
}

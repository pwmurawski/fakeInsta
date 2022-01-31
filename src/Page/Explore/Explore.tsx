import styled from "styled-components";
import { useEffect, useState } from "react";
import ImgPosts from "../../components/ImgPosts/ImgPosts";
import img from "../../assets/2.jpg";
import Fetch from "../../helpers/Fetch/Fetch";
import objectToArray from "../../helpers/objectToArray/objectToArray";

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

interface IPostsData {
  id: string;
  img: string;
  likes: number;
  comments: number;
  user: {
    userId: string;
  };
}

export default function Explore() {
  const abortController = new AbortController();
  const s = abortController.signal;
  const [postsData, setPostsData] = useState<IPostsData[]>([]);

  const getPosts = () => {
    Fetch("posts.json", { signal: s }, (res) => {
      const posts = objectToArray(res, false).flatMap((e) => objectToArray(e));
      setPostsData(posts.reverse());
    });
  };

  useEffect(() => {
    getPosts();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Wrapper>
      <Container>
        <ImgPosts postsData={postsData} customLayOut />
      </Container>
    </Wrapper>
  );
}

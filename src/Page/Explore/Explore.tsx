/* eslint-disable react/jsx-no-useless-fragment */
import styled from "styled-components";
import { useEffect, useState } from "react";
import ImgPosts from "../../components/ImgPosts/ImgPosts";
import Fetch from "../../helpers/Fetch/Fetch";
import objectToArray from "../../helpers/objectToArray";
import sortPostsByDate from "../../helpers/sortPostsByDate";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";

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
  likes?: string[];
  comments?: string[];
  date: string;
  user: {
    userId: string;
  };
}

export default function Explore() {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [loading, setLoading] = useState(true);
  const [postsData, setPostsData] = useState<IPostsData[]>([]);

  const getPosts = () => {
    Fetch("posts.json", { signal }, (res) => {
      const posts = objectToArray(res, false).flatMap((e) => objectToArray(e));
      setPostsData(posts);
      setLoading(false);
    });
  };

  useEffect(() => {
    getPosts();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      {loading ? (
        <LoadingIcon />
      ) : (
        <Wrapper>
          <Container>
            <ImgPosts
              postsData={postsData.sort((post1, post2) =>
                sortPostsByDate(post1, post2)
              )}
              customLayOut
            />
          </Container>
        </Wrapper>
      )}
    </>
  );
}

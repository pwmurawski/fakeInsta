/* eslint-disable react/jsx-no-useless-fragment */
import styled from "styled-components";
import { useEffect, useState } from "react";
import ImgPosts from "../../components/ImgPosts/ImgPosts";
import objectToArray from "../../helpers/objectToArray";
import sortPostsByDate from "../../helpers/sortPostsByDate";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import { fetchPosts } from "../../api/postQuery";
import { IPostsDataProfile } from "../../interfaces/interfaces";

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
  const abortController = new AbortController();
  const { signal } = abortController;
  const [loading, setLoading] = useState(true);
  const [postsData, setPostsData] = useState<IPostsDataProfile[]>([]);

  const getPosts = async () => {
    const res = await fetchPosts(signal);
    if (res) {
      const posts = objectToArray(res, false).flatMap((e) => objectToArray(e));
      setPostsData(posts);
      setLoading(false);
    }
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

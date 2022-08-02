import styled from "styled-components";
import ImgPosts from "../../components/ImgPosts/ImgPosts";
import sortPostsByDate from "../../helpers/sortPostsByDate";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import useAllPosts from "../../hooks/useAllPosts";

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
  const [postsData, loading] = useAllPosts();

  if (loading) return <LoadingIcon />;
  return (
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
  );
}

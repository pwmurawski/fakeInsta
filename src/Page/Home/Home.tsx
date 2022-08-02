/* eslint-disable react/jsx-no-useless-fragment */
import {
  Wrapper,
  Content,
  AsideContainer,
  FooterContainer,
} from "./Home_styles";
import Posts from "../../components/Posts/Posts";
import Stories from "../../components/Home/Stories/Stories";
import Footer from "../../components/Layout/Footer/Footer";
import Aside from "../../components/Home/Aside/Aside";
import sortPostsByDate from "../../helpers/sortPostsByDate";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import useHomePosts from "../../hooks/useHomePosts";

export default function Home() {
  const [loading, numberWatchedUser, postsData] = useHomePosts();

  return (
    <Wrapper>
      <Content>
        {numberWatchedUser !== 0 ? <Stories /> : null}
        {loading ? (
          <LoadingIcon marginTop="100px" />
        ) : (
          <Posts
            postsData={postsData.sort((post1, post2) =>
              sortPostsByDate(post1, post2)
            )}
          />
        )}
      </Content>
      <AsideContainer>
        <Aside />
      </AsideContainer>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </Wrapper>
  );
}

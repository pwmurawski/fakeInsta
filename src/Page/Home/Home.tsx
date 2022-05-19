/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from "react";
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
import objectToArray from "../../helpers/objectToArray";
import useAuth from "../../hooks/useAuth";
import sortPostsByDate from "../../helpers/sortPostsByDate";
import NoWatchedUsers from "../../components/InfoLackPosts/NoWatchedUsers/NoWatchedUsers";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import { fetchPosts, fetchUserPosts } from "../../api/postQuery";
import { fetchUser } from "../../api/userQuery";
import { IPostsData } from "../../interfaces/interfaces";

export default function Home() {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);
  const [numberWatchedUser, setNumberWatchedUser] = useState(0);
  const [postsData, setPostsData] = useState<IPostsData[]>([]);

  const getPostsAuthUser = async () => {
    if (auth) {
      const res = await fetchUserPosts(auth.userId, signal);

      if (res) {
        const posts: IPostsData[] = objectToArray(res);
        setPostsData((prev) => [...prev, ...posts]);
        setLoading(false);
      }
    }
  };

  const getPostsWatchedUsers = async () => {
    if (auth) {
      const resp = await fetchUser(auth.userId, signal);
      if (resp) {
        const { usersWatched }: { usersWatched?: string[] } =
          objectToArray(resp)[0];
        setNumberWatchedUser(usersWatched?.length ?? 0);
        setLoading(true);

        const res = await fetchPosts(signal);
        if (res) {
          const posts = objectToArray(res, false).flatMap((e) =>
            objectToArray(e)
          );
          const newPostsDataWatchedUsers: IPostsData[][] = [];
          usersWatched?.forEach((idUserWatched) => {
            newPostsDataWatchedUsers.push(
              posts.filter((post) => post.user.userId === idUserWatched)
            );
          });
          setPostsData((prev) => [...prev, ...newPostsDataWatchedUsers.flat()]);
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    getPostsAuthUser();
    getPostsWatchedUsers();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Wrapper>
      <Content>
        {numberWatchedUser !== 0 ? <Stories /> : null}
        {loading ? (
          <LoadingIcon marginTop="100px" />
        ) : (
          <>
            {postsData.length !== 0 ? (
              <Posts
                postsData={postsData.sort((post1, post2) =>
                  sortPostsByDate(post1, post2)
                )}
              />
            ) : (
              <NoWatchedUsers />
            )}
          </>
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

/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from "react";
import {
  Wrapper,
  Content,
  AsideContainer,
  FooterContainer,
} from "./Home_styles";
import Posts from "../../components/Posts/Posts";
import Stories from "../../components/Stories/Stories";
import Footer from "../../components/Layout/Footer/Footer";
import Aside from "../../components/Aside/Aside";
import Fetch from "../../helpers/Fetch/Fetch";
import objectToArray from "../../helpers/objectToArray";
import useAuth from "../../hooks/useAuth";
import sortPostsByDate from "../../helpers/sortPostsByDate";
import NoWatchedUsers from "../../components/InfoLackPosts/NoWatchedUsers/NoWatchedUsers";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";

interface IPostsData {
  id: string;
  comments?: string[];
  desc: string;
  img: string;
  likes?: string[];
  location: string;
  date: string;
  user: {
    userFullName: string;
    userId: string;
    userName: string;
    logo?: string;
    storiesActive?: boolean;
  };
}

export default function Home() {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);
  const [getPostsIsComplete, setGetPostsIsComplete] = useState(false);
  const [numberWatchedUser, setNumberWatchedUser] = useState(0);
  const [postsData, setPostsData] = useState<IPostsData[]>([]);

  const getPostsAuthUser = () => {
    Fetch(`posts/${auth?.userId}.json`, { signal }, (res) => {
      const posts: IPostsData[] = objectToArray(res);
      setPostsData(posts);
      setGetPostsIsComplete(true);
      setLoading(false);
    });
  };

  const getPostsWatchedUsers = () => {
    Fetch(`users/${auth?.userId}.json`, { signal }, (resp) => {
      const { usersWatched }: { usersWatched: string[] } =
        objectToArray(resp)[0];
      setNumberWatchedUser(usersWatched.length);
      setLoading(true);

      Fetch("posts.json", { signal }, (res) => {
        const posts = objectToArray(res, false).flatMap((e) =>
          objectToArray(e)
        );
        const newPostsDataWatchedUsers: IPostsData[][] = [];
        usersWatched?.forEach((idUserWatched) => {
          newPostsDataWatchedUsers.push(
            posts.filter((post) => post.user.userId === idUserWatched)
          );
        });
        setPostsData([...postsData, ...newPostsDataWatchedUsers.flat()]);
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    getPostsAuthUser();

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (getPostsIsComplete) getPostsWatchedUsers();

    return () => {
      abortController.abort();
    };
  }, [getPostsIsComplete]);

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

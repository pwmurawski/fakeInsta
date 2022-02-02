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
import Aside from "../../components/Layout/Aside/Aside";
import Fetch from "../../helpers/Fetch/Fetch";
import objectToArray from "../../helpers/objectToArray";
import useAuth from "../../hooks/useAuth";
import sortPostsByDate from "../../helpers/sortPostsByDate";

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

interface IUserData {
  usersWatched?: string[];
}

export default function Home() {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [auth] = useAuth();
  const [getPostsIsComplete, setGetPostsIsComplete] = useState(false);
  const [postsData, setPostsData] = useState<IPostsData[]>([]);

  const getPostsAuthUser = () => {
    Fetch(`posts/${auth?.userId}.json`, { signal }, (res) => {
      const posts: IPostsData[] = objectToArray(res);
      setPostsData(posts);
      setGetPostsIsComplete(true);
    });
  };

  const getPostsWatchedUsers = () => {
    Fetch(`users/${auth?.userId}.json`, { signal }, (resp) => {
      const user: IUserData[] = objectToArray(resp);

      Fetch("posts.json", { signal }, (res) => {
        const posts = objectToArray(res, false).flatMap((e) =>
          objectToArray(e)
        );
        const newPostsDataWatchedUsers: IPostsData[][] = [];
        user[0].usersWatched?.forEach((idUserWatched) => {
          newPostsDataWatchedUsers.push(
            posts.filter((post) => post.user.userId === idUserWatched)
          );
        });
        setPostsData([...postsData, ...newPostsDataWatchedUsers.flat()]);
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
        <Stories />
        <Posts
          postsData={postsData.sort((post1, post2) =>
            sortPostsByDate(post1, post2)
          )}
        />
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

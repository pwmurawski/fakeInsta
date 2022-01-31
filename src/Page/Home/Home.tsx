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
import objectToArray from "../../helpers/objectToArray/objectToArray";
import useAuth from "../../hooks/useAuth";

interface IPostsData {
  id: string;
  comments: number;
  desc: string;
  img: string;
  likes: number;
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
  const s = abortController.signal;
  const [auth] = useAuth();
  const [idUsersWatched, setIdUsersWatched] = useState<string[] | undefined>(
    []
  );
  const [postsData, setPostsData] = useState<IPostsData[]>([]);
  const [postsAuthUser, setPostsAuthUser] = useState<IPostsData[]>([]);
  const [postsWatchedUsers, setPostsWatchedUsers] = useState<IPostsData[]>([]);

  const getPostsAuthUser = () => {
    Fetch(`posts/${auth?.userId}.json`, { signal: s }, (res) => {
      const posts: IPostsData[] = objectToArray(res);
      setPostsAuthUser(posts);
      setPostsData([...postsData, ...posts]);
    });
  };

  const getUsersWatched = () => {
    Fetch(`users/${auth?.userId}.json`, { signal: s }, (res) => {
      const user: IUserData[] = objectToArray(res);
      setIdUsersWatched(user[0].usersWatched);
    });
  };

  const getPostsWatchedUsers = () => {
    getUsersWatched();

    if (idUsersWatched?.length !== 0) {
      Fetch("posts.json", { signal: s }, (res) => {
        const posts = objectToArray(res, false).flatMap((e) =>
          objectToArray(e)
        );
        const newPostsDataWatchedUsers: IPostsData[][] = [];
        idUsersWatched?.forEach((idUserWatched) => {
          newPostsDataWatchedUsers.push(
            posts.filter((post) => post.user.userId === idUserWatched)
          );
        });
        setPostsWatchedUsers(newPostsDataWatchedUsers.flatMap((e) => e));
      });
    }
  };

  const sortPosts = (post1: IPostsData, post2: IPostsData): number => {
    return new Date(post2.date).getTime() - new Date(post1.date).getTime();
  };

  useEffect(() => {
    getPostsAuthUser();
    getPostsWatchedUsers();

    return () => {
      abortController.abort();
    };
  }, [idUsersWatched?.length]);

  useEffect(() => {
    setPostsData([...postsAuthUser, ...postsWatchedUsers]);

    return () => {
      abortController.abort();
    };
  }, [postsWatchedUsers, postsAuthUser]);

  return (
    <Wrapper>
      <Content>
        <Stories />
        <Posts
          postsData={postsData.sort((post1, post2) => sortPosts(post1, post2))}
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

import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  LikeContainer,
  TimeContainer,
} from "../../../../GlobalStyle/GlobalStyle";
import userLogo from "../../../../assets/user.jpg";
import PostHeader from "./PostHeader/PostHeader";
import PostOptions from "./PostOptions/PostOptions";
import PostAddComment from "./PostAddComment/PostAddComment";
import modifyDate from "../../../../helpers/modifyDate";
import CommentsSpace from "./CommentsSpace/CommentsSpace";
import Fetch from "../../../../helpers/Fetch/Fetch";
import objectToArray from "../../../../helpers/objectToArray";
import useAuth from "../../../../hooks/useAuth";

const Content = styled.section`
  min-width: 404px;
  height: 100%;
  position: relative;
  @media (max-width: 760px) {
    flex: 2;
    min-width: 0;
  }
  ${({ postImg }: { postImg?: boolean }) =>
    postImg &&
    css`
      @media (max-width: 760px) {
        max-width: 100%;
        width: 100%;
        min-width: 0;
      }
    `}
`;
const ContainerOptions = styled.div`
  width: 100%;
`;

interface IUserData {
  serFullName: string;
  userId: string;
  userName: string;
  logo?: string;
  storiesActive?: boolean;
}

interface ICommentData {
  id: string;
  user: {
    userId: string;
    userName: string;
    userLogo?: string;
    storiesActive?: boolean;
  };
  content: string;
}

interface IPostData {
  desc: string;
  date: string;
  location: string;
  likes?: string[];
}

export default function PostContent({ postData }: { postData: IPostData }) {
  const abortController = new AbortController();
  const { signal } = abortController;
  const { userId, postId, postImg } = useParams();
  const [auth] = useAuth();
  const [likesData, setLikesData] = useState<string[]>();
  const [userData, setUserData] = useState<IUserData>({
    serFullName: "",
    userId: "",
    userName: "",
    logo: "",
    storiesActive: false,
  });
  const [userAuthData, setUserAuthData] = useState<IUserData>({
    serFullName: "",
    userId: "",
    userName: "",
    logo: "",
    storiesActive: false,
  });
  const [commentsData, setCommentsData] = useState<ICommentData[]>([
    {
      id: "",
      user: {
        userId: "",
        userName: "",
      },
      content: "",
    },
  ]);

  const onAddNewComment = (
    newContent: string,
    setNewContent: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (auth) {
      Fetch(
        `comments/${postId}.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              userId: auth.userId,
              userName: userAuthData.userName,
              userLogo: userAuthData.logo,
              storiesActive: userAuthData.storiesActive,
            },
            content: newContent,
          }),
        },
        (res) => {
          if (res) {
            setCommentsData([
              ...commentsData,
              {
                id: res.name,
                user: {
                  userId: auth.userId,
                  userName: userAuthData.userName,
                  userLogo: userAuthData.logo,
                  storiesActive: userAuthData.storiesActive,
                },
                content: newContent,
              },
            ]);
          }
          setNewContent("");
        }
      );
    }
  };

  const getLikesData = () => {
    setLikesData(postData.likes);
  };

  const getUserData = () => {
    Fetch(`users/${userId}.json`, { signal }, (res) => {
      const user: IUserData = objectToArray(res, false)[0];
      setUserData(user);
    });
  };

  const getUserAuthData = () => {
    if (auth) {
      Fetch(`users/${auth.userId}.json`, { signal }, (res) => {
        const userAuth: IUserData = objectToArray(res, false)[0];
        setUserAuthData(userAuth);
      });
    }
  };

  const getCommentsData = () => {
    Fetch(`comments/${postId}.json`, { signal }, (res) => {
      const newCommentsData: ICommentData[] = objectToArray(res);
      setCommentsData(newCommentsData);
    });
  };

  useEffect(() => {
    getUserData();
    getUserAuthData();
    getCommentsData();

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (postData.likes) {
      getLikesData();
    }

    return () => {
      abortController.abort();
    };
  }, [postData.likes]);

  return (
    <Content postImg={postImg !== "true"}>
      <PostHeader
        userName={userData.userName}
        userId={userId}
        location={postData.location}
        userLogo={userData.logo ?? userLogo}
        storiesActive={userData.storiesActive}
      />
      <CommentsSpace
        postImg={postImg}
        userData={userData}
        postDesc={postData.desc}
        commentsData={commentsData}
      />
      <ContainerOptions>
        {postImg === "true" ? (
          <PostOptions
            postId={postId}
            likesData={likesData}
            setLikesData={setLikesData}
            userId={userId}
            commentBtnOff
          />
        ) : null}
        <LikeContainer>Liczba polubień: {likesData?.length ?? 0}</LikeContainer>
        <TimeContainer>{modifyDate(postData.date)}</TimeContainer>
      </ContainerOptions>
      <PostAddComment onAddNewComment={onAddNewComment} />
    </Content>
  );
}

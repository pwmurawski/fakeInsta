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
import objectToArray from "../../../../helpers/objectToArray";
import useAuth from "../../../../hooks/useAuth";
import {
  fetchAddComment,
  fetchCommentsPost,
} from "../../../../api/commentQuery";
import { fetchUser } from "../../../../api/userQuery";
import {
  IPostData2,
  IUserData,
  ICommentData,
} from "../../../../interfaces/interfaces";

const Content = styled.section`
  min-width: 404px;
  width: 404px;
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

export default function PostContent({ postData }: { postData: IPostData2 }) {
  const abortController = new AbortController();
  const { signal } = abortController;
  const { userId, postId, postImg } = useParams();
  const [auth] = useAuth();
  const [likesData, setLikesData] = useState<string[]>();
  const [userData, setUserData] = useState<IUserData>({
    userFullName: "",
    userId: "",
    userName: "",
    logo: "",
    storiesActive: false,
  });
  const [userAuthData, setUserAuthData] = useState<IUserData>({
    userFullName: "",
    userId: "",
    userName: "",
    logo: "",
    storiesActive: false,
  });
  const [commentsData, setCommentsData] = useState<ICommentData[]>([]);

  const onAddNewComment = async (
    newContent: string,
    setNewContent: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (auth) {
      const commentData = {
        user: {
          userId: auth.userId,
          userName: userAuthData.userName,
          userLogo: userAuthData.logo,
          storiesActive: userAuthData.storiesActive,
        },
        content: newContent,
      };

      if (postId) {
        const res = await fetchAddComment(postId, commentData);
        if (res) {
          setCommentsData([
            ...commentsData,
            {
              id: res.name,
              ...commentData,
            },
          ]);
        }
        setNewContent("");
      }
    }
  };

  const getLikesData = () => {
    setLikesData(postData.likes);
  };

  const getUserData = async () => {
    if (userId) {
      const res = await fetchUser(userId, signal);
      if (res) {
        const user: IUserData = objectToArray(res, false)[0];
        setUserData(user);
      }
    }
  };

  const getUserAuthData = async () => {
    if (auth) {
      const res = await fetchUser(auth.userId, signal);
      if (res) {
        const userAuth: IUserData = objectToArray(res, false)[0];
        setUserAuthData(userAuth);
      }
    }
  };

  const getCommentsData = async () => {
    if (postId) {
      const res = await fetchCommentsPost(postId, signal);
      if (res) {
        const newCommentsData: ICommentData[] = objectToArray(res);
        setCommentsData(newCommentsData);
      }
    }
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

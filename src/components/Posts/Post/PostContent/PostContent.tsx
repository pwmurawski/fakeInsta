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
import { IPostData2 } from "../../../../interfaces/interfaces";
import useAddComment from "../../../../hooks/useAddComment";
import useUserData from "../../../../hooks/useUserData";
import useCommentData from "../../../../hooks/useCommentData";

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
  const { userId, postId, postImg } = useParams();
  const userData = useUserData(userId);
  const [commentsData, setCommentsData] = useCommentData(postId);
  const addComment = useAddComment(postId, setCommentsData);
  const [likesData, setLikesData] = useState<string[]>();

  useEffect(() => {
    if (postData.likes) {
      setLikesData(postData.likes);
    }
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
      <PostAddComment onAddNewComment={addComment} />
    </Content>
  );
}

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import userLogo from "../../../assets/user.jpg";
import { Wrapper, Img, Content, CommentsLink } from "./Post_styles";
import PostHeader from "./PostContent/PostHeader/PostHeader";
import PostOptions from "./PostContent/PostOptions/PostOptions";
import PostAddComment from "./PostContent/PostAddComment/PostAddComment";
import {
  LikeContainer,
  TimeContainer,
  DescriptionPost,
  TextDesc,
  UserNameDesc,
  LinkPost,
} from "../../../GlobalStyle/GlobalStyle";
import modifyDate from "../../../helpers/modifyDate";
import { IPostsData } from "../../../interfaces/interfaces";
import useAddComment from "../../../hooks/useAddComment";

const defaultProps = {
  likes: [],
};

export default function Post({
  id,
  img,
  likes,
  desc,
  location,
  date,
  user,
}: IPostsData) {
  const { pathname } = useLocation();
  const [likesData, setLikesData] = useState<string[]>();
  const addComment = useAddComment(id);

  useEffect(() => {
    if (likes?.length !== 0) {
      setLikesData(likes);
    }
  }, [likes]);

  return (
    <Wrapper>
      <PostHeader
        userName={user.userName}
        userId={user.userId}
        location={location}
        userLogo={user.logo ?? userLogo}
        storiesActive={user.storiesActive}
      />
      <Img src={img} />
      <Content>
        <PostOptions
          postId={id}
          userId={user.userId}
          likesData={likesData}
          setLikesData={setLikesData}
        />
        <LikeContainer>Liczba polubień: {likesData?.length ?? 0}</LikeContainer>
        <DescriptionPost>
          <TextDesc>
            <UserNameDesc>{user.userName}</UserNameDesc> {desc}
          </TextDesc>
        </DescriptionPost>
        <CommentsLink>
          <LinkPost
            to={`/p/${user.userId}/${id}/false/`}
            state={{ background: pathname }}
            color="gray"
          >
            Zobacz komentarze
          </LinkPost>
        </CommentsLink>
        <TimeContainer>{modifyDate(date)}</TimeContainer>
        <PostAddComment onAddNewComment={addComment} />
      </Content>
    </Wrapper>
  );
}

Post.defaultProps = defaultProps;

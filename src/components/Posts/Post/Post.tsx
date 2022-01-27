import { Link, useLocation } from "react-router-dom";
import { Wrapper, Img, Content, CommentsLink } from "./Post_styles";
import PostHeader from "./PostHeader/PostHeader";
import PostOptions from "./PostOptions/PostOptions";
import PostAddComment from "./PostAddComment/PostAddComment";
import {
  LikeContainer,
  TimeContainer,
  DescriptionPost,
  TextDesc,
  UserNameDesc,
} from "../../../GlobalStyle/GlobalStyle";

interface IPostProps {
  id: number;
  user: {
    id: number;
    userName: string;
    logo: string;
    storiesActive?: boolean;
  };
  img: string;
  like: number;
  description: string;
  comments: number;
  time: number;
}

export default function Post({
  id,
  user,
  img,
  like,
  description,
  comments,
  time,
}: IPostProps) {
  const { pathname } = useLocation();

  return (
    <Wrapper>
      <PostHeader
        userName={user.userName}
        userLogo={user.logo}
        storiesActive={user.storiesActive ?? false}
      />
      <Img src={img} />
      <Content>
        <PostOptions postId={id} />
        <LikeContainer>Liczba polubień: {like}</LikeContainer>
        <DescriptionPost>
          <TextDesc>
            <UserNameDesc>{user.userName}</UserNameDesc> {description}
          </TextDesc>
        </DescriptionPost>
        <CommentsLink>
          <Link to={`/p/${id}/`} state={{ background: pathname }}>
            Zobacz komentarze: {comments}
          </Link>
        </CommentsLink>
        <TimeContainer>{time} MIN TEMU</TimeContainer>
        <PostAddComment />
      </Content>
    </Wrapper>
  );
}

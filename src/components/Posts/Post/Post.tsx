import { Link, useLocation } from "react-router-dom";
import userLogo from "../../../assets/user.jpg";
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
  id: string;
  comments: number;
  description: string;
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

export default function Post({
  id,
  img,
  likes,
  description,
  comments,
  location,
  date,
  user,
}: IPostProps) {
  const { pathname } = useLocation();
  const newDate = new Date(date);

  return (
    <Wrapper>
      <PostHeader
        userName={user.userName}
        location={location}
        userLogo={user.logo ?? userLogo}
        storiesActive={user.storiesActive ?? false}
      />
      <Img src={img} />
      <Content>
        <PostOptions postId={id} userId={user.userId} />
        <LikeContainer>Liczba polubień: {likes}</LikeContainer>
        <DescriptionPost>
          <TextDesc>
            <UserNameDesc>{user.userName}</UserNameDesc> {description}
          </TextDesc>
        </DescriptionPost>
        <CommentsLink>
          <Link
            to={`/p/${user.userId}/${id}/`}
            state={{ background: pathname }}
          >
            Zobacz komentarze: {comments}
          </Link>
        </CommentsLink>
        <TimeContainer>
          {`${newDate.getDate()}.${
            newDate.getMonth() + 1
          }.${newDate.getFullYear()}   ${newDate.getHours()}:${newDate.getMinutes()}`}
        </TimeContainer>
        <PostAddComment />
      </Content>
    </Wrapper>
  );
}

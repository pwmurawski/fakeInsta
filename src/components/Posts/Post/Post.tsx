import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
  LinkPost,
} from "../../../GlobalStyle/GlobalStyle";
import modifyDate from "../../../helpers/modifyDate";

interface IPostProps {
  id: string;
  comments?: string[];
  description: string;
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

const defaultProps = {
  likes: [],
  comments: [],
};

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
  const [likesData, setLikesData] = useState<string[]>();

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
        storiesActive={user.storiesActive ?? false}
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
            <UserNameDesc>{user.userName}</UserNameDesc> {description}
          </TextDesc>
        </DescriptionPost>
        <CommentsLink>
          <LinkPost
            to={`/p/${user.userId}/${id}/false/`}
            state={{ background: pathname }}
            color="gray"
          >
            Zobacz komentarze: {comments?.length}
          </LinkPost>
        </CommentsLink>
        <TimeContainer>{modifyDate(date)}</TimeContainer>
        <PostAddComment />
      </Content>
    </Wrapper>
  );
}

Post.defaultProps = defaultProps;

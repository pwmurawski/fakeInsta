import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Content,
  Img,
  CommentsContainer,
  ContainerOptions,
  ImgContainer,
  PostContainer,
  DescriptionPostPage,
} from "./Post_styles";
import {
  LikeContainer,
  TimeContainer,
  TextDesc,
  UserNameDesc,
  UserLogo,
  ModalWindowWrapper,
} from "../../GlobalStyle/GlobalStyle";
import userLogo from "../../assets/user.jpg";
import PostHeader from "../../components/Posts/Post/PostHeader/PostHeader";
import PostOptions from "../../components/Posts/Post/PostOptions/PostOptions";
import PostAddComment from "../../components/Posts/Post/PostAddComment/PostAddComment";
import Comments from "../../components/Posts/Post/Comments/Comments";
import Modal from "../../hoc/Modal";
import Fetch from "../../helpers/Fetch/Fetch";
import objectToArray from "../../helpers/objectToArray";
import modifyDate from "../../helpers/modifyDate";

interface IUserData {
  serFullName: string;
  userId: string;
  userName: string;
  logo?: string;
  storiesActive?: boolean;
}

interface IPostData {
  img: string;
  desc: string;
  date: string;
  location: string;
  likes?: string[];
  comments?: {
    id: string;
    user: {
      userName: string;
      userLogo: string;
      storiesActive?: boolean;
    };
    content: string;
  }[];
}

function Post() {
  const abortController = new AbortController();
  const { signal } = abortController;
  const { userId, postId } = useParams();
  const navigate = useNavigate();
  const [likesData, setLikesData] = useState<string[]>();
  const [postData, setPostData] = useState<IPostData>({
    img: "",
    desc: "",
    date: "",
    likes: [],
    comments: [],
    location: "",
  });
  const [userData, setUserData] = useState<IUserData>({
    serFullName: "",
    userId: "",
    userName: "",
    logo: "",
    storiesActive: false,
  });

  const getPostData = () => {
    Fetch(`posts/${userId}/${postId}.json`, { signal }, (res) => {
      const post: IPostData = res;
      setPostData(post);
      setLikesData(post.likes);
    });
  };

  const getUserData = () => {
    Fetch(`users/${userId}.json`, { signal }, (res) => {
      const user: IUserData[] = objectToArray(res, false);
      setUserData(user[0]);
    });
  };

  useEffect(() => {
    getPostData();
    getUserData();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <ModalWindowWrapper
      onClick={() => {
        navigate(-1);
      }}
    >
      <PostContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ImgContainer>
          <Img src={postData.img} />
        </ImgContainer>
        <Content>
          <PostHeader
            userName={userData.userName}
            location={postData.location}
            userLogo={userData.logo ?? userLogo}
            storiesActive={userData.storiesActive}
          />
          <CommentsContainer>
            <DescriptionPostPage>
              <UserLogo
                width="32px"
                height="32px"
                storiesActive={userData.storiesActive}
                src={userData.logo ?? userLogo}
              />
              <TextDesc>
                <UserNameDesc>{userData.userName}</UserNameDesc> {postData.desc}
              </TextDesc>
            </DescriptionPostPage>
            <Comments comments={postData.comments ?? []} />
          </CommentsContainer>
          <ContainerOptions>
            <PostOptions
              postId={postId}
              likesData={likesData}
              setLikesData={setLikesData}
              userId={userId}
              commentBtnOff
            />
            <LikeContainer>
              Liczba polubień: {likesData?.length ?? 0}
            </LikeContainer>
            <TimeContainer>{modifyDate(postData.date)}</TimeContainer>
            <PostAddComment />
          </ContainerOptions>
        </Content>
      </PostContainer>
    </ModalWindowWrapper>
  );
}

export default Modal(Post);

/* eslint-disable react/jsx-no-useless-fragment */
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
  ExitBtnModalWindow,
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
import ExitSvg from "../../components/SvgIcon/AddNewMessage_SvgIcon";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";

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
  const { userId, postId, postImg } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [imgFullScreen, setImgFullScreen] = useState(false);
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

  const getUserData = () => {
    Fetch(`users/${userId}.json`, { signal }, (res) => {
      const user: IUserData[] = objectToArray(res, false);
      setUserData(user[0]);
    });
  };

  const getPostData = () => {
    Fetch(`posts/${userId}/${postId}.json`, { signal }, (res) => {
      const post: IPostData = res;
      setPostData(post);
      setLikesData(post.likes);
      setLoading(false);
    });
  };

  useEffect(() => {
    getUserData();
    getPostData();

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
      <ExitBtnModalWindow>
        <ExitSvg color="white" width="25" height="25" />
      </ExitBtnModalWindow>
      {imgFullScreen ? (
        <Img
          onClick={(e) => {
            e.stopPropagation();
            setImgFullScreen(false);
          }}
          src={postData.img}
        />
      ) : (
        <>
          {loading ? (
            <LoadingIcon />
          ) : (
            <PostContainer
              onClick={(e) => {
                e.stopPropagation();
              }}
              postImg={postImg === "true"}
            >
              <ImgContainer postImg={postImg !== "true"}>
                <Img
                  onClick={() => setImgFullScreen(true)}
                  src={postData.img}
                />
              </ImgContainer>
              <Content postImg={postImg !== "true"}>
                <PostHeader
                  userName={userData.userName}
                  location={postData.location}
                  userLogo={userData.logo ?? userLogo}
                  storiesActive={userData.storiesActive}
                />
                <CommentsContainer postImg={postImg === "true"}>
                  <DescriptionPostPage>
                    <UserLogo
                      width="32px"
                      height="32px"
                      storiesActive={userData.storiesActive}
                      src={userData.logo ?? userLogo}
                    />
                    <TextDesc>
                      <UserNameDesc>{userData.userName}</UserNameDesc>{" "}
                      {postData.desc}
                    </TextDesc>
                  </DescriptionPostPage>
                  <Comments comments={postData.comments ?? []} />
                </CommentsContainer>
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
                  <LikeContainer>
                    Liczba polubień: {likesData?.length ?? 0}
                  </LikeContainer>
                  <TimeContainer>{modifyDate(postData.date)}</TimeContainer>
                  <PostAddComment />
                </ContainerOptions>
              </Content>
            </PostContainer>
          )}
        </>
      )}
    </ModalWindowWrapper>
  );
}

export default Modal(Post);

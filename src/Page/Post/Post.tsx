/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Content,
  Img,
  ContainerOptions,
  ImgContainer,
  PostContainer,
} from "./Post_styles";
import {
  LikeContainer,
  TimeContainer,
  ModalWindowWrapper,
  ExitBtnModalWindow,
} from "../../GlobalStyle/GlobalStyle";
import userLogo from "../../assets/user.jpg";
import PostHeader from "../../components/Posts/Post/PostHeader/PostHeader";
import PostOptions from "../../components/Posts/Post/PostOptions/PostOptions";
import PostAddComment from "../../components/Posts/Post/PostAddComment/PostAddComment";
import Modal from "../../hoc/Modal";
import Fetch from "../../helpers/Fetch/Fetch";
import objectToArray from "../../helpers/objectToArray";
import modifyDate from "../../helpers/modifyDate";
import ExitSvg from "../../components/SvgIcon/AddNewMessage_SvgIcon";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import CommentsSpace from "../../components/CommentsSpace/CommentsSpace";
import useAuth from "../../hooks/useAuth";

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

function Post() {
  const abortController = new AbortController();
  const { signal } = abortController;
  const { userId, postId, postImg } = useParams();
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);
  const [imgFullScreen, setImgFullScreen] = useState(false);
  const [likesData, setLikesData] = useState<string[]>();
  const [postData, setPostData] = useState<IPostData>({
    img: "",
    desc: "",
    date: "",
    likes: [],
    location: "",
  });
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

  const getUserData = () => {
    Fetch(`users/${userId}.json`, { signal }, (res) => {
      const user: IUserData = objectToArray(res, false)[0];
      setUserData(user);
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

  const getUserAuthData = () => {
    Fetch(`users/${auth?.userId}.json`, { signal }, (res) => {
      const userAuth: IUserData = objectToArray(res, false)[0];
      setUserAuthData(userAuth);
    });
  };

  const getCommentsData = () => {
    Fetch(`comments/${postId}.json`, { signal }, (res) => {
      const newCommentsData: ICommentData[] = objectToArray(res);
      setCommentsData(newCommentsData);
    });
  };

  const onAddNewComment = (
    newContent: string,
    setNewContent: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (auth?.userId) {
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

  useEffect(() => {
    getUserData();
    getPostData();
    getUserAuthData();
    getCommentsData();

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
                  <LikeContainer>
                    Liczba polubień: {likesData?.length ?? 0}
                  </LikeContainer>
                  <TimeContainer>{modifyDate(postData.date)}</TimeContainer>
                </ContainerOptions>
                <PostAddComment onAddNewComment={onAddNewComment} />
              </Content>
            </PostContainer>
          )}
        </>
      )}
    </ModalWindowWrapper>
  );
}

export default Modal(Post);

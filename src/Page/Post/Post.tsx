import { useState } from "react";
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
import img from "../../assets/2.jpg";
import imgUser from "../../assets/user.jpg";
import PostHeader from "../../components/Posts/Post/PostHeader/PostHeader";
import PostOptions from "../../components/Posts/Post/PostOptions/PostOptions";
import PostAddComment from "../../components/Posts/Post/PostAddComment/PostAddComment";
import Comments from "../../components/Posts/Post/Comments/Comments";
import Modal from "../../hoc/Modal";

interface IPostData {
  id: number;
  user: {
    userName: string;
    userLogo: string;
    storiesActive?: boolean;
  };
  img: string;
  comments: {
    id: number;
    user: {
      userName: string;
      userLogo: string;
      storiesActive?: boolean;
    };
    content: string;
  }[];
  description: string;
  like: number;
  time: number;
}

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState<IPostData>({
    id: id ? parseFloat(id) : 0,
    user: {
      userName: "simeas",
      userLogo: imgUser,
    },
    img,
    comments: [
      {
        id: 1,
        user: {
          userName: "elooo",
          userLogo: imgUser,
        },
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text",
      },
      {
        id: 2,
        user: {
          userName: "elooo",
          userLogo: imgUser,
        },
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text",
      },
      {
        id: 3,
        user: {
          userName: "ziomek",
          userLogo: imgUser,
          storiesActive: true,
        },
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text",
      },
      {
        id: 4,
        user: {
          userName: "kowalaaaaaa",
          userLogo: imgUser,
        },
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text",
      },
    ],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    like: 99,
    time: 33,
  });

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
          <Img src={`${postData.img}`} />
        </ImgContainer>
        <Content>
          <PostHeader
            userName={postData.user.userName}
            userLogo={postData.user.userLogo}
            storiesActive={postData.user.storiesActive}
          />
          <CommentsContainer>
            <DescriptionPostPage>
              <UserLogo src={postData.user.userLogo} />
              <TextDesc>
                <UserNameDesc>{postData.user.userName}</UserNameDesc>{" "}
                {postData.description}
              </TextDesc>
            </DescriptionPostPage>
            <Comments comments={postData.comments} />
          </CommentsContainer>
          <ContainerOptions>
            <PostOptions postId={postData.id} commentBtnOff />
            <LikeContainer>Liczba polubień: {postData.like}</LikeContainer>
            <TimeContainer>{postData.time} MIN TEMU</TimeContainer>
            <PostAddComment />
          </ContainerOptions>
        </Content>
      </PostContainer>
    </ModalWindowWrapper>
  );
}

export default Modal(Post);

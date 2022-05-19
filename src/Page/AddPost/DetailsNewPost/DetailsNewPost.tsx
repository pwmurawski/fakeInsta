import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ModalWindowWrapper } from "../../../GlobalStyle/GlobalStyle";
import Modal from "../../../hoc/Modal";
import ExitBtnModalWindow from "../../../components/ExitBtnModalWindow/ExitBtnModalWindow";
import useAuth from "../../../hooks/useAuth";
import objectToArray from "../../../helpers/objectToArray";
import AddPostHeader from "../../../components/AddPost/AddPostHeader/AddPostHeader";
import AddPostContent from "../../../components/AddPost/AddPostContent/AddPostContent";
import { fetchUser } from "../../../api/userQuery";
import { fetchCreateNewPost } from "../../../api/postQuery";
import {
  ILocationStateNewPost,
  IPostData,
  IUserAuth,
} from "../../../interfaces/interfaces";

const NewPostContainer = styled.section`
  background-color: white;
  max-width: 1061px;
  width: 100%;
  max-height: 100%;
  height: fit-content;
  min-height: 764px;
  border-radius: 12px;
  transition: min-height 500ms;

  @media (max-width: 760px) {
    min-height: 500px;
  }
`;
const headerHeight = "43px";
const Container = styled.section`
  display: flex;
  width: 100%;
  height: calc(100% - ${headerHeight});
`;
const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-bottom-left-radius: 12px;
  overflow: hidden;
`;
const Img = styled.img`
  max-width: 100%;
  height: auto;
`;

function DetailsNewPost() {
  const abortController = new AbortController();
  const { signal } = abortController;
  const navigate = useNavigate();
  const { state } = useLocation() as ILocationStateNewPost;
  const [auth] = useAuth();
  const actualTime = new Date();
  const [newPostData, setNewPostData] = useState<IPostData>({
    img: state?.uploadImg,
    desc: "",
    location: "",
    date: actualTime,
    user: {
      userFullName: "",
      userId: "",
      userName: "",
    },
  });

  const getUserAuth = async () => {
    if (auth) {
      const res = await fetchUser(auth.userId, signal);

      if (res) {
        const user: IUserAuth[] = objectToArray(res);
        setNewPostData({
          ...newPostData,
          user: {
            userFullName: user[0].userFullName,
            userId: user[0].userId,
            userName: user[0].userName,
            logo: user[0].logo,
            storiesActive: user[0].storiesActive,
          },
        });
      }
    }
  };

  const createNewPost = () => {
    if (auth) {
      fetchCreateNewPost(auth.userId, newPostData, signal);
    }
  };

  useEffect(() => {
    getUserAuth();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <ModalWindowWrapper
      onClick={() => {
        navigate(-2);
      }}
    >
      <ExitBtnModalWindow />
      <NewPostContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <AddPostHeader
          onClickShareBtn={() => {
            createNewPost();
            navigate(-2);
          }}
          onClickBackBtn={() => {
            navigate(-1);
          }}
        />
        <Container>
          <ImgContainer>
            <Img src={state?.uploadImg} />
          </ImgContainer>
          <AddPostContent
            newPostData={newPostData}
            setNewPostData={setNewPostData}
          />
        </Container>
      </NewPostContainer>
    </ModalWindowWrapper>
  );
}

export default Modal(DetailsNewPost);

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ModalWindowWrapper } from "../../../GlobalStyle/GlobalStyle";
import Modal from "../../../hoc/Modal";
import ExitBtnModalWindow from "../../../components/ExitBtnModalWindow/ExitBtnModalWindow";
import AddPostHeader from "../../../components/AddPost/AddPostHeader/AddPostHeader";
import AddPostContent from "../../../components/AddPost/AddPostContent/AddPostContent";
import useAddPost from "../../../hooks/useAddPost";

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
  const navigate = useNavigate();
  const [newPostData, setNewPostData, addPost] = useAddPost();

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
            addPost();
            navigate(-2);
          }}
          onClickBackBtn={() => {
            navigate(-1);
          }}
        />
        <Container>
          <ImgContainer>
            <Img src={newPostData.img} />
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

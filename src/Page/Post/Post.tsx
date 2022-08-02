/* eslint-disable react/jsx-no-useless-fragment */
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Img, PostContainer } from "./Post_styles";
import { ModalWindowWrapper } from "../../GlobalStyle/GlobalStyle";
import ExitBtnModalWindow from "../../components/ExitBtnModalWindow/ExitBtnModalWindow";
import Modal from "../../hoc/Modal";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import PostImg from "../../components/Posts/Post/PostImg/PostImg";
import PostContent from "../../components/Posts/Post/PostContent/PostContent";
import usePostPage from "../../hooks/usePostPage";

function Post() {
  const { postImg } = useParams();
  const navigate = useNavigate();
  const [imgFullScreen, setImgFullScreen] = useState(false);
  const [postData, loading] = usePostPage();

  return (
    <ModalWindowWrapper
      onClick={() => {
        navigate(-1);
      }}
    >
      <ExitBtnModalWindow />
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
              <PostImg
                image={postData.img}
                onClick={() => setImgFullScreen(true)}
                postImg={postImg}
              />
              <PostContent postData={postData} />
            </PostContainer>
          )}
        </>
      )}
    </ModalWindowWrapper>
  );
}

export default Modal(Post);

/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Img, PostContainer } from "./Post_styles";
import { ModalWindowWrapper } from "../../GlobalStyle/GlobalStyle";
import ExitBtnModalWindow from "../../components/ExitBtnModalWindow/ExitBtnModalWindow";
import Modal from "../../hoc/Modal";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import PostImg from "../../components/Posts/Post/PostImg/PostImg";
import PostContent from "../../components/Posts/Post/PostContent/PostContent";
import { fetchPost } from "../../api/postQuery";
import { IPostDataPost } from "../../interfaces/interfaces";

function Post() {
  const abortController = new AbortController();
  const { signal } = abortController;
  const { userId, postId, postImg } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [imgFullScreen, setImgFullScreen] = useState(false);
  const [postData, setPostData] = useState<IPostDataPost>({
    img: "",
    desc: "",
    date: "",
    likes: [],
    location: "",
  });

  const getPostData = async () => {
    if (postId && userId) {
      const res = await fetchPost(postId, userId, signal);
      if (res) {
        const post: IPostDataPost = res;
        setPostData(post);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
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

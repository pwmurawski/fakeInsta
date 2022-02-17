/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Img, PostContainer } from "./Post_styles";
import {
  ModalWindowWrapper,
  ExitBtnModalWindow,
} from "../../GlobalStyle/GlobalStyle";
import Modal from "../../hoc/Modal";
import ExitSvg from "../../components/SvgIcon/AddNewMessage_SvgIcon";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import PostImg from "../../components/Posts/Post/PostImg/PostImg";
import Fetch from "../../helpers/Fetch/Fetch";
import PostContent from "../../components/Posts/Post/PostContent/PostContent";

interface IPostData {
  img: string;
  desc: string;
  date: string;
  location: string;
  likes?: string[];
}

function Post() {
  const abortController = new AbortController();
  const { signal } = abortController;
  const { userId, postId, postImg } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [imgFullScreen, setImgFullScreen] = useState(false);
  const [postData, setPostData] = useState<IPostData>({
    img: "",
    desc: "",
    date: "",
    likes: [],
    location: "",
  });

  const getPostData = () => {
    Fetch(`posts/${userId}/${postId}.json`, { signal }, (res) => {
      const post: IPostData = res;
      setPostData(post);
      setLoading(false);
    });
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

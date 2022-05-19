import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import objectToArray from "../../helpers/objectToArray";
import useAuth from "../../hooks/useAuth";
import UserInfo from "../../components/UserProfile/UserInfo/UserInfo";
import UserProfilePagesLinks from "../../components/UserProfile/UserProfilePagesLinks/UserProfilePagesLinks";
import UserProfileRoutes from "../../components/UserProfile/UserProfileRoutes/UserProfileRoutes";
import ProfileHeader from "../../components/UserProfile/ProfileHeader/ProfileHeader";
import { fetchUser } from "../../api/userQuery";
import { fetchPosts, fetchUserPosts } from "../../api/postQuery";
import {
  ILocationState,
  IPostsDataProfile,
  IUserAuthDataProfile,
} from "../../interfaces/interfaces";

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: fit-content;
`;
const ProfilContainer = styled.section`
  box-sizing: border-box;
  max-width: 935px;
  width: 100%;
  padding: 0 20px;
  @media (max-width: 735px) {
    padding: 0;
  }
`;

export default function Profil() {
  const abortController = new AbortController();
  const { signal } = abortController;
  const { state } = useLocation() as ILocationState;
  const background = state?.background;
  const media = window.matchMedia("(max-width: 735px)");
  const [auth] = useAuth();
  const [isMediaMatches, setIsMediaMatches] = useState(!!media.matches);
  const [loading, setLoading] = useState(true);
  const [loadingSaved, setLoadingSaved] = useState(true);
  const [loadingTagged, setLoadingTagged] = useState(false);
  const [postsData, setPostsData] = useState<IPostsDataProfile[]>([]);
  const [postsSavedData, setPostsSavedData] = useState<IPostsDataProfile[]>([]);
  const [postsTaggedData, setPostsTaggedData] = useState([]);
  const [userAuthData, setUserAuthData] = useState<IUserAuthDataProfile>({
    email: "",
    userFullName: "",
    userId: "",
    userName: "",
  });

  const resizeHandler = () => {
    if (media.matches) {
      setIsMediaMatches(true);
    } else {
      setIsMediaMatches(false);
    }
  };

  const getUserAuthData = async () => {
    if (auth) {
      const res = await fetchUser(auth.userId, signal);
      if (res) {
        const userData: IUserAuthDataProfile[] = objectToArray(res, false);
        setUserAuthData(userData[0]);
      }
    }
  };

  const getPostsData = async () => {
    if (auth) {
      const res = await fetchUserPosts(auth.userId, signal);
      const posts: IPostsDataProfile[] = objectToArray(res);
      setPostsData(posts);
      setLoading(false);
    }
  };

  const getSavedPosts = async () => {
    const res = await fetchPosts(signal);

    const posts = objectToArray(res, false).flatMap((e) => objectToArray(e));
    const newSavedPosts: IPostsDataProfile[][] = [];
    userAuthData.savedPosts?.forEach((idSavedPost) => {
      newSavedPosts.push(posts.filter((post) => post.id === idSavedPost));
    });
    setPostsSavedData([...postsSavedData, ...newSavedPosts.flat()]);
    setLoadingSaved(false);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    getUserAuthData();
    getPostsData();

    return () => {
      window.removeEventListener("resize", resizeHandler);
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (userAuthData.savedPosts) {
      getSavedPosts();
    } else if (userAuthData.userId) {
      setLoadingSaved(false);
    }
  }, [userAuthData.userId]);

  return (
    <Wrapper>
      <ProfilContainer>
        <ProfileHeader
          userData={userAuthData}
          postsData={postsData}
          isMediaMatches={isMediaMatches}
        />
        {isMediaMatches ? (
          <UserInfo
            columnReverse
            userData={userAuthData}
            postsData={postsData}
          />
        ) : null}
        <UserProfilePagesLinks baseUrl="/profile/" />
        <UserProfileRoutes
          background={background}
          postsData={postsData}
          postsSavedData={postsSavedData}
          postsTaggedData={postsTaggedData}
          loading={loading}
          loadingSaved={loadingSaved}
          loadingTagged={loadingTagged}
        />
      </ProfilContainer>
    </Wrapper>
  );
}

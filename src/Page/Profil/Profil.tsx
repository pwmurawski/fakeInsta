import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Fetch from "../../helpers/Fetch/Fetch";
import objectToArray from "../../helpers/objectToArray";
import useAuth from "../../hooks/useAuth";
import UserInfo from "../../components/UserProfile/UserInfo/UserInfo";
import UserProfilePagesLinks from "../../components/UserProfile/UserProfilePagesLinks/UserProfilePagesLinks";
import UserProfileRoutes from "../../components/UserProfile/UserProfileRoutes/UserProfileRoutes";
import ProfileHeader from "../../components/UserProfile/ProfileHeader/ProfileHeader";

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

interface ILocationState {
  state?: {
    background: string;
  };
}

interface IPostsData {
  id: string;
  img: string;
  likes?: string[];
  comments?: string[];
  date: string;
  user: {
    userId: string;
  };
}

interface IUserAuthData {
  email: string;
  userFullName: string;
  userId: string;
  userName: string;
  logo?: string;
  usersWatched?: string[];
  storiesActive?: boolean;
  savedPosts?: string[];
  bio?: string;
  website?: string;
}

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
  const [postsData, setPostsData] = useState<IPostsData[]>([]);
  const [postsSavedData, setPostsSavedData] = useState<IPostsData[]>([]);
  const [postsTaggedData, setPostsTaggedData] = useState([]);
  const [userAuthData, setUserAuthData] = useState<IUserAuthData>({
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

  const getUserAuthData = () => {
    if (auth) {
      Fetch(`users/${auth.userId}.json`, { signal }, (res) => {
        const userData: IUserAuthData[] = objectToArray(res, false);
        setUserAuthData(userData[0]);
      });
    }
  };

  const getPostsData = () => {
    if (auth) {
      Fetch(`posts/${auth.userId}.json`, { signal }, (res) => {
        const posts: IPostsData[] = objectToArray(res);
        setPostsData(posts);
        setLoading(false);
      });
    }
  };

  const getSavedPosts = () => {
    Fetch("posts.json", { signal }, (res) => {
      const posts = objectToArray(res, false).flatMap((e) => objectToArray(e));
      const newSavedPosts: IPostsData[][] = [];
      userAuthData.savedPosts?.forEach((idSavedPost) => {
        newSavedPosts.push(posts.filter((post) => post.id === idSavedPost));
      });
      setPostsSavedData([...postsSavedData, ...newSavedPosts.flat()]);
      setLoadingSaved(false);
    });
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
          auth={auth}
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

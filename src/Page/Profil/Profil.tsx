/* eslint-disable react/jsx-no-useless-fragment */
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Wrapper,
  User,
  ContentHeader,
  Header,
  Img,
  ProfilContainer,
  UserEditLink,
  UserImg,
  UserName,
} from "./Profil_styles";
import userImg from "../../assets/user.jpg";
import Fetch from "../../helpers/Fetch/Fetch";
import objectToArray from "../../helpers/objectToArray";
import useAuth from "../../hooks/useAuth";
import UserInfo from "../../components/UserInfo/UserInfo";
import UserProfilePagesLinks from "../../components/UserProfilePagesLinks/UserProfilePagesLinks";
import UserProfileRoutes from "../../components/UserProfileRoutes/UserProfileRoutes";

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
  const [userData, setUserData] = useState<IUserAuthData>({
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
    Fetch(`users/${auth?.userId}.json`, { signal }, (res) => {
      const userAuthData: IUserAuthData[] = objectToArray(res, false);
      setUserData(userAuthData[0]);
    });
  };

  const getPostsData = () => {
    Fetch(`posts/${auth?.userId}.json`, { signal }, (res) => {
      const posts: IPostsData[] = objectToArray(res);
      setPostsData(posts);
      setLoading(false);
    });
  };

  const getSavedPosts = () => {
    Fetch("posts.json", { signal }, (res) => {
      const posts = objectToArray(res, false).flatMap((e) => objectToArray(e));
      const newSavedPosts: IPostsData[][] = [];
      userData.savedPosts?.forEach((idSavedPost) => {
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
    if (userData.savedPosts) {
      getSavedPosts();
    } else if (userData.userId) {
      setLoadingSaved(false);
    }
  }, [userData.userId]);

  return (
    <Wrapper>
      <ProfilContainer>
        <Header>
          <UserImg>
            <Link
              to={
                userData.storiesActive
                  ? `/stories/${auth?.userId}/`
                  : "/profile/"
              }
            >
              <Img
                storiesActive={userData.storiesActive}
                src={userData.logo ?? userImg}
              />
            </Link>
          </UserImg>
          <ContentHeader>
            <User>
              <UserName>{userData.userName}</UserName>
              <UserEditLink to="/accounts/edit/">Edytuj profil</UserEditLink>
            </User>
            {isMediaMatches ? null : (
              <UserInfo userData={userData} postsData={postsData} />
            )}
          </ContentHeader>
        </Header>
        {isMediaMatches ? (
          <UserInfo columnReverse userData={userData} postsData={postsData} />
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

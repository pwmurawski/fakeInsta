/* eslint-disable react/jsx-no-useless-fragment */
import { Route, Routes, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Wrapper,
  User,
  ContentHeader,
  Header,
  Img,
  Options,
  OptionsLink,
  OptionsLinkText,
  ProfilContainer,
  SavedPostsInfo,
  Stat,
  StatValue,
  Svg,
  UserEditLink,
  UserFullName,
  UserImg,
  UserName,
  UserStats,
} from "./Profil_styles";
import userImg from "../../assets/user.jpg";
import {
  PostsSvg,
  TaggedSvg,
  SavedSvg,
} from "../../components/SvgIcon/ProfilPage_SvgIcon";
import ImgPosts from "../../components/ImgPosts/ImgPosts";
import Fetch from "../../helpers/Fetch/Fetch";
import objectToArray from "../../helpers/objectToArray";
import useAuth from "../../hooks/useAuth";
import sortPostsByDate from "../../helpers/sortPostsByDate";
import NoSavedPosts from "../../components/InfoLackPosts/NoSavedPosts/NoSavedPosts";
import NoTaggedPosts from "../../components/InfoLackPosts/NoTaggedPosts/NoTaggedPosts";
import NoMyPosts from "../../components/InfoLackPosts/NoMyPosts/NoMyPosts";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";

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
              <>
                <UserStats>
                  <Stat>
                    Posty: <StatValue>{postsData.length}</StatValue>
                  </Stat>
                  <Stat>
                    <StatValue>0</StatValue> obserwujących
                  </Stat>
                  <Stat>
                    Obserwowani:{" "}
                    <StatValue>{userData.usersWatched?.length ?? 0}</StatValue>
                  </Stat>
                </UserStats>
                <UserFullName>{userData.userFullName}</UserFullName>
              </>
            )}
          </ContentHeader>
        </Header>
        {isMediaMatches ? (
          <>
            <UserFullName>{userData.userFullName}</UserFullName>
            <UserStats>
              <Stat>
                Posty: <StatValue>{postsData.length}</StatValue>
              </Stat>
              <Stat>
                <StatValue>0</StatValue> obserwujących
              </Stat>
              <Stat>
                Obserwowani:{" "}
                <StatValue>{userData.usersWatched?.length ?? 0}</StatValue>
              </Stat>
            </UserStats>
          </>
        ) : null}
        <Options>
          <OptionsLink to="/profile/">
            {({ isActive }) => (
              <>
                <Svg>
                  <PostsSvg color={isActive ? "#262626" : undefined} />
                </Svg>
                <OptionsLinkText>POSTY</OptionsLinkText>
              </>
            )}
          </OptionsLink>
          <OptionsLink to="saved/">
            {({ isActive }) => (
              <>
                <Svg>
                  <SavedSvg color={isActive ? "#262626" : undefined} />
                </Svg>
                <OptionsLinkText>ZAPISANE</OptionsLinkText>
              </>
            )}
          </OptionsLink>
          <OptionsLink to="tagged/">
            {({ isActive }) => (
              <>
                <Svg>
                  <TaggedSvg color={isActive ? "#262626" : undefined} />
                </Svg>
                <OptionsLinkText>Z OZNACZENIEM</OptionsLinkText>
              </>
            )}
          </OptionsLink>
        </Options>
        <Routes location={background}>
          <Route
            index
            element={
              <>
                {loading ? (
                  <LoadingIcon />
                ) : (
                  <>
                    {postsData.length !== 0 ? (
                      <ImgPosts
                        postsData={postsData.sort((post1, post2) =>
                          sortPostsByDate(post1, post2)
                        )}
                      />
                    ) : (
                      <NoMyPosts />
                    )}
                  </>
                )}
              </>
            }
          />
          <Route
            path="saved"
            element={
              <>
                {loadingSaved ? (
                  <LoadingIcon />
                ) : (
                  <>
                    <SavedPostsInfo>
                      Tylko Ty widzisz zapisane elementy
                    </SavedPostsInfo>
                    {postsSavedData.length !== 0 ? (
                      <ImgPosts postsData={[...postsSavedData].reverse()} />
                    ) : (
                      <NoSavedPosts />
                    )}
                  </>
                )}
              </>
            }
          />
          <Route
            path="tagged"
            element={
              <>
                {loadingTagged ? (
                  <LoadingIcon />
                ) : (
                  <>
                    {postsTaggedData.length !== 0 ? (
                      <ImgPosts postsData={postsTaggedData} />
                    ) : (
                      <NoTaggedPosts />
                    )}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </ProfilContainer>
    </Wrapper>
  );
}

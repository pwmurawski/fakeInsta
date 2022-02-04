/* eslint-disable react/jsx-no-useless-fragment */
import {
  Route,
  Routes,
  useLocation,
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
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
  Stat,
  StatValue,
  Svg,
  UserFullName,
  UserImg,
  UserName,
  UserStats,
} from "../Profil/Profil_styles";
import userImg from "../../assets/user.jpg";
import {
  PostsSvg,
  TaggedSvg,
} from "../../components/SvgIcon/ProfilPage_SvgIcon";
import ImgPosts from "../../components/ImgPosts/ImgPosts";
import Fetch from "../../helpers/Fetch/Fetch";
import objectToArray from "../../helpers/objectToArray";
import sortPostsByDate from "../../helpers/sortPostsByDate";
import NoTaggedPosts from "../../components/InfoLackPosts/NoTaggedPosts/NoTaggedPosts";
import NoMyPosts from "../../components/InfoLackPosts/NoMyPosts/NoMyPosts";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import useAuth from "../../hooks/useAuth";

const FollowUserBtn = styled.button`
  box-sizing: border-box;
  width: 111px;
  height: 30px;
  padding: 0px 24px;
  margin-left: 20px;
  background-color: #0095f6;
  border: 0;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  color: white;
  text-align: center;
  text-decoration: none;
  cursor: pointer;

  @media (max-width: 735px) {
    max-width: 250px;
    width: 100%;
    margin: 0;
  }
`;

const AlreadyWatchedUserBtn = styled(FollowUserBtn)`
  background-color: transparent;
  width: 134px;
  padding: 5px 9px;
  color: black;
  border: 1px solid lightgray;

  :last-of-type {
    font-size: 11px;
    padding: 0;
  }

  @media (max-width: 735px) {
    max-width: 250px;
    width: 100%;
    margin: 0;
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

interface IUserData {
  email: string;
  userFullName: string;
  userName: string;
  logo?: string;
  usersWatched?: string[];
  storiesActive?: boolean;
}

interface IUserAuthData {
  id: string;
  usersWatched?: string[];
}

export default function UserProfil() {
  const abortController = new AbortController();
  const { signal } = abortController;
  const { state } = useLocation() as ILocationState;
  const background = state?.background;
  const [auth] = useAuth();
  const { userId } = useParams();
  const navigate = useNavigate();
  const media = window.matchMedia("(max-width: 735px)");
  const [isMediaMatches, setIsMediaMatches] = useState(!!media.matches);
  const [loading, setLoading] = useState(true);
  const [postsData, setPostsData] = useState<IPostsData[]>([]);
  const [postsTaggedData, setPostsTaggedData] = useState([]);
  const [userAuthData, setUserAuthData] = useState<IUserAuthData>({
    id: "",
  });
  const [userData, setUserData] = useState<IUserData>({
    email: "",
    userFullName: "",
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
      const user: IUserAuthData[] = objectToArray(res);
      setUserAuthData({ id: user[0].id, usersWatched: user[0].usersWatched });
    });
  };

  const getUserData = () => {
    Fetch(`users/${userId}.json`, { signal }, (res) => {
      const user: IUserData[] = objectToArray(res, false);
      setUserData(user[0]);
    });
  };

  const getPostsData = () => {
    Fetch(`posts/${userId}.json`, { signal }, (res) => {
      const posts: IPostsData[] = objectToArray(res);
      setPostsData(posts);
      setLoading(false);
    });
  };

  const addToWatchedUsers = () => {
    Fetch(
      `users/${auth?.userId}/${userAuthData.id}/usersWatched.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...(userAuthData.usersWatched ?? []), userId]),
      },
      (res) => {
        setUserAuthData({ ...userAuthData, usersWatched: res });
      }
    );
  };

  const deleteToWatchedUsers = () => {
    const delUserWatch = userAuthData.usersWatched?.filter((e) => e !== userId);
    Fetch(
      `users/${auth?.userId}/${userAuthData.id}/usersWatched.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(delUserWatch),
      },
      (res) => {
        setUserAuthData({ ...userAuthData, usersWatched: res });
      }
    );
  };

  useEffect(() => {
    if (userId === auth?.userId) navigate("/profile/");
    window.addEventListener("resize", resizeHandler);

    getUserAuthData();
    getUserData();
    getPostsData();

    return () => {
      window.removeEventListener("resize", resizeHandler);
      abortController.abort();
    };
  }, []);

  return (
    <Wrapper>
      <ProfilContainer>
        <Header>
          <UserImg>
            <Link
              to={
                userData.storiesActive ? `/stories/${userId}/` : `/u/${userId}/`
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
              {userAuthData.usersWatched?.includes(userId ?? "") ? (
                <>
                  <AlreadyWatchedUserBtn>
                    Wyślij wiadomość
                  </AlreadyWatchedUserBtn>
                  <AlreadyWatchedUserBtn onClick={deleteToWatchedUsers}>
                    Przestań obserwować
                  </AlreadyWatchedUserBtn>
                </>
              ) : (
                <FollowUserBtn onClick={addToWatchedUsers}>
                  Obserwuj
                </FollowUserBtn>
              )}
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
          <OptionsLink to={`/u/${userId}/`}>
            {({ isActive }) => (
              <>
                <Svg>
                  <PostsSvg color={isActive ? "#262626" : undefined} />
                </Svg>
                <OptionsLinkText>POSTY</OptionsLinkText>
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
            path="tagged"
            element={
              <>
                {postsTaggedData.length !== 0 ? (
                  <ImgPosts postsData={postsTaggedData} />
                ) : (
                  <NoTaggedPosts />
                )}
              </>
            }
          />
        </Routes>
      </ProfilContainer>
    </Wrapper>
  );
}

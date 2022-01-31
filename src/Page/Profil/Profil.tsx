import { Route, Routes, useLocation } from "react-router-dom";
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
import objectToArray from "../../helpers/objectToArray/objectToArray";
import useAuth from "../../hooks/useAuth";

interface ILocationState {
  state?: {
    background: string;
  };
}

interface IUserAuthPostsData {
  id: string;
  img: string;
  likes: number;
  comments: number;
  user: {
    userId: string;
  };
}

interface IUserAuthData {
  id: string;
  email: string;
  userFullName: string;
  userId: string;
  userName: string;
  usersWatched?: string[];
}

export default function Profil() {
  const abortController = new AbortController();
  const s = abortController.signal;
  const [auth] = useAuth();
  const [userData, setUserData] = useState<IUserAuthData>({
    email: "",
    id: "",
    userFullName: "",
    userId: "",
    userName: "",
  });
  const [postsData, setPostsData] = useState<IUserAuthPostsData[]>([]);
  const [postsSavedData, setPostsSavedData] = useState([]);
  const [postsTaggedData, setPostsTaggedData] = useState([]);

  const { state } = useLocation() as ILocationState;
  const background = state?.background;
  const media = window.matchMedia("(max-width: 735px)");
  const [isMediaMatches, setIsMediaMatches] = useState(!!media.matches);

  const resizeHandler = () => {
    if (media.matches) {
      setIsMediaMatches(true);
    } else {
      setIsMediaMatches(false);
    }
  };

  const getUserAuthData = () => {
    Fetch(`users/${auth?.userId}.json`, { signal: s }, (res) => {
      const userAuthData: IUserAuthData[] = objectToArray(res);
      setUserData(userAuthData[0]);
    });
  };

  const getPostsData = () => {
    Fetch(`posts/${auth?.userId}.json`, { signal: s }, (res) => {
      const posts: IUserAuthPostsData[] = objectToArray(res);
      setPostsData(posts.reverse());
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

  return (
    <Wrapper>
      <ProfilContainer>
        <Header>
          <UserImg>
            <Img src={userImg} />
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
          <OptionsLink to="/pwmurawski123/">
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
          <Route index element={<ImgPosts postsData={postsData} />} />
          <Route
            path="saved"
            element={
              <>
                <SavedPostsInfo>
                  Tylko Ty widzisz zapisane elementy
                </SavedPostsInfo>
                <ImgPosts postsData={postsSavedData} />
              </>
            }
          />
          <Route
            path="tagged"
            element={<ImgPosts postsData={postsTaggedData} />}
          />
        </Routes>
      </ProfilContainer>
    </Wrapper>
  );
}

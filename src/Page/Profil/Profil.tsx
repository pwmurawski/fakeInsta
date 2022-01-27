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
import img from "../../assets/2.jpg";
import img2 from "../../assets/3.jpg";
import img3 from "../../assets/1.jpg";
import ImgPosts from "../../components/ImgPosts/ImgPosts";

interface ILocationState {
  state?: {
    background: string;
  };
}

export default function Profil() {
  const [postsData, setPostsData] = useState([
    {
      id: 1,
      img,
      likes: 64,
      comments: 32,
    },
    {
      id: 2,
      img: img2,
      likes: 345,
      comments: 45,
    },
    {
      id: 3,
      img,
      likes: 789,
      comments: 543,
    },
    {
      id: 4,
      img: img2,
      likes: 123,
      comments: 89,
    },
    {
      id: 5,
      img,
      likes: 917,
      comments: 132,
    },
    {
      id: 6,
      img: img3,
      likes: 999,
      comments: 129,
    },
    {
      id: 7,
      img,
      likes: 83,
      comments: 89,
    },
    {
      id: 8,
      img,
      likes: 433,
      comments: 89,
    },
    {
      id: 9,
      img: img2,
      likes: 123,
      comments: 89,
    },
    {
      id: 10,
      img: img2,
      likes: 1221,
      comments: 829,
    },
    {
      id: 11,
      img: img2,
      likes: 3,
      comments: 19,
    },
    {
      id: 12,
      img: img3,
      likes: 123,
      comments: 89,
    },
  ]);
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

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
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
              <UserName>pwmurawski123</UserName>
              <UserEditLink to="/accounts/edit/">Edytuj profil</UserEditLink>
            </User>
            {isMediaMatches ? null : (
              <>
                <UserStats>
                  <Stat>
                    Posty: <StatValue>0</StatValue>
                  </Stat>
                  <Stat>
                    <StatValue>30</StatValue> obserwujących
                  </Stat>
                  <Stat>
                    Obserwowani: <StatValue>176</StatValue>
                  </Stat>
                </UserStats>
                <UserFullName>Paweł Murawski</UserFullName>
              </>
            )}
          </ContentHeader>
        </Header>
        {isMediaMatches ? (
          <>
            <UserFullName>Paweł Murawski</UserFullName>
            <UserStats>
              <Stat>
                Posty: <StatValue>0</StatValue>
              </Stat>
              <Stat>
                <StatValue>30</StatValue> obserwujących
              </Stat>
              <Stat>
                Obserwowani: <StatValue>176</StatValue>
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
                <ImgPosts
                  postsData={[
                    {
                      id: 12,
                      img: img3,
                      likes: 123,
                      comments: 89,
                    },
                  ]}
                />
              </>
            }
          />
          <Route path="tagged" element={<ImgPosts postsData={[]} />} />
        </Routes>
      </ProfilContainer>
    </Wrapper>
  );
}

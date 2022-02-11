/* eslint-disable react/jsx-no-useless-fragment */
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Wrapper,
  User,
  ContentHeader,
  Header,
  Img,
  ProfilContainer,
  UserImg,
  UserName,
} from "../Profil/Profil_styles";
import userImg from "../../assets/user.jpg";
import Fetch from "../../helpers/Fetch/Fetch";
import objectToArray from "../../helpers/objectToArray";
import useAuth from "../../hooks/useAuth";
import UserInfo from "../../components/UserInfo/UserInfo";
import UserProfilePagesLinks from "../../components/UserProfilePagesLinks/UserProfilePagesLinks";
import UserProfileRoutes from "../../components/UserProfileRoutes/UserProfileRoutes";

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
    margin-top: 2px;
    :last-of-type {
      margin-top: 2px;
    }
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
  userId: string;
  logo?: string;
  usersWatched?: string[];
  storiesActive?: boolean;
  bio?: string;
  website?: string;
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
    userId: "",
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
        const user: IUserAuthData[] = objectToArray(res);
        setUserAuthData({ id: user[0].id, usersWatched: user[0].usersWatched });
      });
    }
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
    if (auth) {
      Fetch(
        `users/${auth.userId}/${userAuthData.id}/usersWatched.json`,
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
    }
  };

  const deleteToWatchedUsers = () => {
    const delUserWatch = userAuthData.usersWatched?.filter((e) => e !== userId);
    if (auth) {
      Fetch(
        `users/${auth.userId}/${userAuthData.id}/usersWatched.json`,
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
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    getUserAuthData();

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    if (userId === auth?.userId) navigate("/profile/");

    setLoading(true);
    getUserData();
    getPostsData();

    return () => {
      abortController.abort();
    };
  }, [userId]);

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
              <UserInfo userData={userData} postsData={postsData} />
            )}
          </ContentHeader>
        </Header>
        {isMediaMatches ? (
          <UserInfo columnReverse userData={userData} postsData={postsData} />
        ) : null}
        <UserProfilePagesLinks baseUrl={`/u/${userId}/`} savedPageDisabled />
        <UserProfileRoutes
          background={background}
          postsData={postsData}
          postsTaggedData={postsTaggedData}
          loading={loading}
          profileUserNotAuth
        />
      </ProfilContainer>
    </Wrapper>
  );
}

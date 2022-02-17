import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
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
        <ProfileHeader
          userData={userData}
          userAuthWatched={userAuthData.usersWatched}
          postsData={postsData}
          auth={auth}
          isMediaMatches={isMediaMatches}
          profileUserNotAuth
          userId={userId}
          onFollow={addToWatchedUsers}
          onUnFollow={deleteToWatchedUsers}
        />
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

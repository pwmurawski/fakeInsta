import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import objectToArray from "../../helpers/objectToArray";
import useAuth from "../../hooks/useAuth";
import UserInfo from "../../components/UserProfile/UserInfo/UserInfo";
import UserProfilePagesLinks from "../../components/UserProfile/UserProfilePagesLinks/UserProfilePagesLinks";
import UserProfileRoutes from "../../components/UserProfile/UserProfileRoutes/UserProfileRoutes";
import ProfileHeader from "../../components/UserProfile/ProfileHeader/ProfileHeader";
import {
  fetchAddToWatchedUsers,
  fetchDeleteToWatchedUsers,
  fetchUser,
} from "../../api/userQuery";
import { fetchUserPosts } from "../../api/postQuery";
import {
  ILocationState,
  IPostsDataProfile,
  IUserAuthDataUserProfil,
  IUserDataUserProfil,
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
  const [postsData, setPostsData] = useState<IPostsDataProfile[]>([]);
  const [postsTaggedData, setPostsTaggedData] = useState([]);
  const [userAuthData, setUserAuthData] = useState<IUserAuthDataUserProfil>({
    id: "",
  });
  const [userData, setUserData] = useState<IUserDataUserProfil>({
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

  const getUserAuthData = async () => {
    if (auth) {
      const res = await fetchUser(auth.userId, signal);
      if (res) {
        const user: IUserAuthDataUserProfil[] = objectToArray(res);
        setUserAuthData({ id: user[0].id, usersWatched: user[0].usersWatched });
      }
    }
  };

  const getUserData = async () => {
    if (userId) {
      const res = await fetchUser(userId, signal);
      if (res) {
        const user: IUserDataUserProfil[] = objectToArray(res, false);
        setUserData(user[0]);
      }
    }
  };

  const getPostsData = async () => {
    if (userId) {
      const res = await fetchUserPosts(userId, signal);

      const posts: IPostsDataProfile[] = objectToArray(res);
      setPostsData(posts);
      setLoading(false);
    }
  };

  const addToWatchedUsers = async () => {
    if (auth) {
      const res = await fetchAddToWatchedUsers(
        auth.userId,
        userAuthData.id,
        userId,
        userAuthData.usersWatched,
        signal
      );
      if (res) {
        setUserAuthData({ ...userAuthData, usersWatched: res });
      }
    }
  };

  const deleteToWatchedUsers = async () => {
    const delUserWatch = userAuthData.usersWatched?.filter((e) => e !== userId);
    if (auth) {
      const res = await fetchDeleteToWatchedUsers(
        auth.userId,
        userAuthData.id,
        delUserWatch,
        signal
      );
      setUserAuthData({ ...userAuthData, usersWatched: res });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    getUserAuthData();

    return () => {
      window.removeEventListener("resize", resizeHandler);
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (userId === auth?.userId) navigate("/profile/");
    setLoading(true);
    getUserData();
    getPostsData();
  }, [userId]);

  return (
    <Wrapper>
      <ProfilContainer>
        <ProfileHeader
          userData={userData}
          userAuthWatched={userAuthData.usersWatched}
          postsData={postsData}
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

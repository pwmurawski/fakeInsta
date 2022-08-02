import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import UserInfo from "../../components/UserProfile/UserInfo/UserInfo";
import UserProfilePagesLinks from "../../components/UserProfile/UserProfilePagesLinks/UserProfilePagesLinks";
import UserProfileRoutes from "../../components/UserProfile/UserProfileRoutes/UserProfileRoutes";
import ProfileHeader from "../../components/UserProfile/ProfileHeader/ProfileHeader";

import {
  ILocationState,
  IUserAuthDataUserProfil,
} from "../../interfaces/interfaces";
import useMediaQueries from "../../hooks/useMediaQueries";
import useUserAuthData from "../../hooks/useUserAuthData";
import useUserPage from "../../hooks/useUserPage";
import usePostUserPage from "../../hooks/usePostUserPage";

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
  const { state } = useLocation() as ILocationState;
  const background = state?.background;
  const { userId } = useParams();
  const navigate = useNavigate();
  const isMediaMatches = useMediaQueries("(max-width: 735px)");
  const [userAuthData, setUserAuthData] =
    useUserAuthData<IUserAuthDataUserProfil>();
  const [userData, addToWatchedUsers, deleteToWatchedUsers] = useUserPage(
    userAuthData,
    setUserAuthData
  );
  const [postsData, loading] = usePostUserPage();
  const [postsTaggedData, setPostsTaggedData] = useState([]);

  useEffect(() => {
    if (userId === userAuthData?.userId) navigate("/profile/");
  }, [userId, userAuthData?.userId]);

  return (
    <Wrapper>
      <ProfilContainer>
        <ProfileHeader
          userData={userData}
          userAuthWatched={userAuthData?.usersWatched}
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

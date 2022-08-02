import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import UserInfo from "../../components/UserProfile/UserInfo/UserInfo";
import UserProfilePagesLinks from "../../components/UserProfile/UserProfilePagesLinks/UserProfilePagesLinks";
import UserProfileRoutes from "../../components/UserProfile/UserProfileRoutes/UserProfileRoutes";
import ProfileHeader from "../../components/UserProfile/ProfileHeader/ProfileHeader";
import {
  ILocationState,
  IUserAuthDataProfile,
} from "../../interfaces/interfaces";
import useMediaQueries from "../../hooks/useMediaQueries";
import usePostsUserAuth from "../../hooks/usePostsUserAuth";
import useUserAuthData from "../../hooks/useUserAuthData";
import useSavedPosts from "../../hooks/useSavedPosts";

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

export default function Profil() {
  const { state } = useLocation() as ILocationState;
  const background = state?.background;
  const isMediaMatches = useMediaQueries("(max-width: 735px)");
  const [userAuthData] = useUserAuthData<IUserAuthDataProfile>();
  const [postsData, loading] = usePostsUserAuth();
  const [postsSavedData, loadingSaved] = useSavedPosts(userAuthData);
  const [loadingTagged, setLoadingTagged] = useState(false);
  const [postsTaggedData, setPostsTaggedData] = useState([]);

  return (
    <Wrapper>
      <ProfilContainer>
        <ProfileHeader
          userData={userAuthData}
          postsData={postsData}
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

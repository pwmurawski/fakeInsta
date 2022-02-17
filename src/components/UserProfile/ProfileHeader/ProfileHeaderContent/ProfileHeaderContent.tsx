/* eslint-disable react/jsx-no-useless-fragment */
import styled from "styled-components";
import UserInfo from "../../../../components/UserProfile/UserInfo/UserInfo";
import ProfileHeaderButtons from "../ProfileHeaderButtons/ProfileHeaderButtons";

const ContentHeader = styled.div`
  flex-shrink: 1;
  width: 100%;
  height: 100%;
`;
const User = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  @media (max-width: 735px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0;
    height: fit-content;
  }
`;
const UserName = styled.h2`
  width: fit-content;
  font-size: 28px;
  font-weight: 200;
  margin: 0;
  @media (max-width: 735px) {
    margin-bottom: 12px;
  }
`;

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

interface IProfileHeaderContentProps {
  userData: IUserAuthData;
  postsData: IPostsData[];
  isMediaMatches: boolean;
  profileUserNotAuth?: boolean;
  userAuthWatched?: string[];
  userId?: string;
  onFollow?: () => void;
  onUnFollow?: () => void;
}

const defaultProps = {
  profileUserNotAuth: false,
  userAuthWatched: undefined,
  userId: undefined,
  onFollow: undefined,
  onUnFollow: undefined,
};

export default function ProfileHeaderContent({
  userData,
  postsData,
  isMediaMatches,
  profileUserNotAuth,
  userAuthWatched,
  userId,
  onFollow,
  onUnFollow,
}: IProfileHeaderContentProps) {
  return (
    <ContentHeader>
      <User>
        <UserName>{userData.userName}</UserName>
        <ProfileHeaderButtons
          profileUserNotAuth={profileUserNotAuth}
          userAuthWatched={userAuthWatched}
          userId={userId}
          onFollow={onFollow}
          onUnFollow={onUnFollow}
        />
      </User>
      {isMediaMatches ? null : (
        <UserInfo userData={userData} postsData={postsData} />
      )}
    </ContentHeader>
  );
}

ProfileHeaderContent.defaultProps = defaultProps;

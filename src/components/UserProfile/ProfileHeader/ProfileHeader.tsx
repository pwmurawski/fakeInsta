import styled from "styled-components";
import ProfileHeaderContent from "./ProfileHeaderContent/ProfileHeaderContent";
import ProfileHeaderUserImg from "./ProfileHeaderUserImg/ProfileHeaderUserImg";

const Header = styled.header`
  display: flex;
  align-items: center;
  max-width: 100%;
  height: fit-content;
  margin: 0 0 44px;

  @media (max-width: 735px) {
    margin: 16px 16px 24px;
    height: fit-content;
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

interface IProfileHeaderProps {
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

export default function ProfileHeader({
  userData,
  postsData,
  isMediaMatches,
  profileUserNotAuth,
  userAuthWatched,
  userId,
  onFollow,
  onUnFollow,
}: IProfileHeaderProps) {
  return (
    <Header>
      <ProfileHeaderUserImg userData={userData} />
      <ProfileHeaderContent
        userData={userData}
        userAuthWatched={userAuthWatched}
        postsData={postsData}
        isMediaMatches={isMediaMatches}
        profileUserNotAuth={profileUserNotAuth}
        userId={userId}
        onFollow={onFollow}
        onUnFollow={onUnFollow}
      />
    </Header>
  );
}

ProfileHeader.defaultProps = defaultProps;

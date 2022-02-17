import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: ${({ columnReverse }: { columnReverse?: boolean }) =>
    columnReverse ? "column-reverse" : "column"};
`;

const UserStats = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  height: 18px;
  margin-bottom: 20px;

  @media (max-width: 735px) {
    box-sizing: border-box;
    justify-content: center;
    height: 61px;
    padding: 12px 0;
    margin-bottom: 0;
    border-top: 1px solid lightgray;
  }
`;
const Stat = styled.div`
  margin-right: 40px;

  @media (max-width: 735px) {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 0;
    font-size: 14px;
    color: gray;
  }
`;
const StatValue = styled.span`
  font-weight: 600;
  @media (max-width: 735px) {
    color: black;
  }
`;
const UserInfoContainer = styled.section`
  font-size: 16px;
  @media (max-width: 735px) {
    padding: 0 16px 21px;
    font-size: 14px;
  }
`;
const UserFullName = styled.h1`
  margin: 0;
  font-size: inherit;
  font-weight: 600;
`;
const Bio = styled.p`
  margin: 0;
`;
const Website = styled.a`
  color: #00376b;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
`;

interface IUserData {
  userFullName: string;
  usersWatched?: string[];
  bio?: string;
  website?: string;
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

interface IUserInfoProps {
  userData: IUserData;
  postsData: IPostsData[];
  columnReverse?: boolean;
}

const defaultProps = {
  columnReverse: false,
};

export default function UserInfo({
  userData,
  postsData,
  columnReverse,
}: IUserInfoProps) {
  return (
    <Wrapper columnReverse={columnReverse}>
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
      <UserInfoContainer>
        <UserFullName>{userData.userFullName}</UserFullName>
        <Bio>{userData.bio}</Bio>
        <Website href={userData.website}>{userData.website}</Website>
      </UserInfoContainer>
    </Wrapper>
  );
}

UserInfo.defaultProps = defaultProps;

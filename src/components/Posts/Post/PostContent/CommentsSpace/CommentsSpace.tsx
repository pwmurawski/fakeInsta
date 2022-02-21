import styled from "styled-components";
import {
  UserNameDesc,
  UserLogo,
  DescriptionPost,
} from "../../../../../GlobalStyle/GlobalStyle";
import userLogo from "../../../../../assets/user.jpg";
import Comments from "../Comments/Comments";

const heightHeader = "70px";
const heightContainerOptions = "160px";
const CommentsContainer = styled.section`
  box-sizing: border-box;
  width: 100%;
  height: ${({ postImg }: { postImg?: boolean }) =>
    postImg
      ? `calc(100% - ${heightHeader} - ${heightContainerOptions})`
      : `calc(100% - ${heightHeader} - ${heightContainerOptions} + 54px)`};
  padding: 16px;
  border-top: 1px solid lightgray;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0;
  }
`;
const DescriptionPostPage = styled(DescriptionPost)`
  padding: 0;
`;
const TextDesc = styled.p`
  width: 100%;
  margin: 0 0 0 15px;
  font-size: 14px;
  word-wrap: break-word;
`;

interface IUserData {
  serFullName: string;
  userId: string;
  userName: string;
  logo?: string;
  storiesActive?: boolean;
}

interface ICommentData {
  id: string;
  user: {
    userId: string;
    userName: string;
    userLogo?: string;
    storiesActive?: boolean;
  };
  content: string;
}

interface ICommentsSpaceProps {
  postImg?: string;
  userData: IUserData;
  postDesc: string;
  commentsData: ICommentData[];
}

const defaultProps = {
  postImg: null,
};

export default function CommentsSpace({
  postImg,
  userData,
  postDesc,
  commentsData,
}: ICommentsSpaceProps) {
  return (
    <CommentsContainer postImg={postImg === "true"}>
      <DescriptionPostPage>
        <UserLogo
          width="32px"
          height="32px"
          storiesActive={userData.storiesActive}
          src={userData.logo ?? userLogo}
        />
        <TextDesc>
          <UserNameDesc>{userData.userName}</UserNameDesc> {postDesc}
        </TextDesc>
      </DescriptionPostPage>
      <Comments comments={commentsData} />
    </CommentsContainer>
  );
}

CommentsSpace.defaultProps = defaultProps;

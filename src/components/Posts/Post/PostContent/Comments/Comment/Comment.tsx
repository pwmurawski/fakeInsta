import styled from "styled-components";
import {
  LinkPost,
  UserLogo,
  UserNameDesc,
} from "../../../../../../GlobalStyle/GlobalStyle";
import userLogo from "../../../../../../assets/user.jpg";

export const Wrapper = styled.article`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 12px 0 0;
  min-height: 61px;
  height: fit-content;
`;
const Content = styled.p`
  max-width: 320px;
  width: 100%;
  margin: 0 0 0 15px;
  font-size: 14px;
  word-wrap: break-word;
`;

interface ICommentProps {
  user: {
    userId: string;
    userName: string;
    userLogo?: string;
    storiesActive?: boolean;
  };
  content: string;
}

export default function Comment({ user, content }: ICommentProps) {
  return (
    <Wrapper>
      <UserLogo
        storiesActive={user.storiesActive}
        src={user.userLogo ?? userLogo}
        width="32px"
        height="32px"
      />
      <Content>
        <UserNameDesc>
          <LinkPost to={`/u/${user.userId}/`}>{user.userName}</LinkPost>
        </UserNameDesc>{" "}
        {content}
      </Content>
    </Wrapper>
  );
}

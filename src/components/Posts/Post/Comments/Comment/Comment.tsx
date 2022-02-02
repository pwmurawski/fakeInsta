import styled from "styled-components";
import {
  LinkPost,
  TextDesc,
  UserNameDesc,
  UserLogo,
} from "../../../../../GlobalStyle/GlobalStyle";

export const Wrapper = styled.article`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 12px 0 0;
  min-height: 61px;
  height: fit-content;
`;

interface ICommentProps {
  user: {
    userName: string;
    userLogo: string;
    storiesActive?: boolean;
  };
  content: string;
}

export default function Comment({ user, content }: ICommentProps) {
  return (
    <Wrapper>
      <UserLogo storiesActive={user.storiesActive} src={user.userLogo} />
      <TextDesc>
        <UserNameDesc>
          <LinkPost to="/">{user.userName}</LinkPost>
        </UserNameDesc>{" "}
        {content}
      </TextDesc>
    </Wrapper>
  );
}

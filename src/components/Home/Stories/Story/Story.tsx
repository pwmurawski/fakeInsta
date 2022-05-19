import styled from "styled-components";
import userImg from "../../../../assets/user.jpg";
import { IStoryProps } from "../../../../interfaces/interfaces";

const Container = styled.li`
  box-sizing: border-box;
  width: 80px;
  height: 100%;
  padding: 0 4px;
  list-style: none;
`;
const StoryIcon = styled.img`
  box-sizing: border-box;
  margin: 0 3px;
  width: 66px;
  height: 66px;
  border: 2px solid violet;
  border-radius: 150px;
`;
const UserName = styled.div`
  text-align: center;
  font-size: 12px;
  overflow: hidden;
`;

const defaultProps = {
  userLogo: null,
};

export default function Story({ userName, userLogo }: IStoryProps) {
  return (
    <Container>
      <StoryIcon src={userLogo ?? userImg} />
      <UserName>{userName}</UserName>
    </Container>
  );
}

Story.defaultProps = defaultProps;

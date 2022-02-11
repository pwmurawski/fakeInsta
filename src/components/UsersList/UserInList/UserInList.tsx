import styled from "styled-components";

const Container = styled.section`
  display: flex;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  padding: 8px 16px;
  cursor: pointer;
  position: relative;
  :hover {
    background-color: whitesmoke;
  }
`;
const UserImg = styled.img`
  width: ${({ width }) => width ?? "44px"};
  height: ${({ height }) => height ?? "44px"};
  border-radius: 150px;
  margin-right: 12px;
`;
const UserNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const UserName = styled.h2`
  margin: 0;
  font-size: ${({ fontSize }: { fontSize?: string }) => fontSize ?? "14px"};
  font-weight: 600;
  color: black;
`;
const UserFullName = styled(UserName)`
  font-size: ${({ fontSize }: { fontSize?: string }) => fontSize ?? "14px"};
  font-weight: 400;
  color: gray;
`;
const UserText = styled.p`
  position: absolute;
  right: 16px;
  font-size: 12px;
  color: #0095f6;
`;

interface IUserInListProps {
  userName: string;
  userFullName: string;
  userImg: string;
  textInUser?: string;
  userImgSize?: string;
  fontSize?: string;
}

const defaultProps = {
  textInUser: null,
  userImgSize: null,
  fontSize: null,
};

export default function UserInList({
  userName,
  userFullName,
  userImg,
  textInUser,
  userImgSize,
  fontSize,
}: IUserInListProps) {
  return (
    <Container>
      <UserImg src={userImg} width={userImgSize} height={userImgSize} />
      <UserNameContainer>
        <UserName fontSize={fontSize}>{userName}</UserName>
        <UserFullName fontSize={fontSize}>{userFullName}</UserFullName>
      </UserNameContainer>
      {textInUser ? <UserText>{textInUser}</UserText> : null}
    </Container>
  );
}

UserInList.defaultProps = defaultProps;

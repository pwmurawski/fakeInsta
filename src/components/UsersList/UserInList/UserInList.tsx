import styled from "styled-components";

const Container = styled.section`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  padding: 8px 16px;
  cursor: pointer;
  :hover {
    background-color: whitesmoke;
  }
`;
const UserImg = styled.img`
  width: 44px;
  height: 44px;
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
  font-size: 14px;
  font-weight: 600;
  color: black;
`;
const UserFullName = styled(UserName)`
  font-weight: 400;
  color: gray;
`;

interface IUserInListProps {
  userName: string;
  userFullName: string;
  userImg: string;
}

export default function UserInList({
  userName,
  userFullName,
  userImg,
}: IUserInListProps) {
  return (
    <Container>
      <UserImg src={userImg} />
      <UserNameContainer>
        <UserName>{userName}</UserName>
        <UserFullName>{userFullName}</UserFullName>
      </UserNameContainer>
    </Container>
  );
}

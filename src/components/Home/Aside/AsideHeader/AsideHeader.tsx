import styled from "styled-components";
import { Link } from "react-router-dom";
import userImg from "../../../../assets/user.jpg";
import { UserLogo } from "../../../../GlobalStyle/GlobalStyle";
import { IUserData } from "../../../../interfaces/interfaces";

const Header = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  margin: 22px 0 10px 0;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-left: 20px;
`;
const UserName = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  color: black;
  text-decoration: none;
`;
const UserFullName = styled.div`
  font-size: 14px;
  color: gray;
  font-weight: 400;
`;

export default function AsideHeader({ userData }: { userData: IUserData }) {
  return (
    <Header>
      <Link to="/profile/">
        <UserLogo
          src={userData.logo ?? userImg}
          storiesActive={userData.storiesActive}
          width="56px"
          height="56px"
        />
      </Link>
      <Container>
        <UserName to="/profile/">{userData.userName}</UserName>
        <UserFullName>{userData.userFullName}</UserFullName>
      </Container>
    </Header>
  );
}

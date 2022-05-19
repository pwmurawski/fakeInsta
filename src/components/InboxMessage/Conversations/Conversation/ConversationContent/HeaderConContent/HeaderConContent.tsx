import styled from "styled-components";
import { UserLogo } from "../../../../../../GlobalStyle/GlobalStyle";
import userImg from "../../../../../../assets/user.jpg";
import { IHeaderConContentProps } from "../../../../../../interfaces/interfaces";

const Header = styled.header`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid lightgray;
`;
const UserName = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-weight: 600;
`;

const defaultProps = {
  userLogo: null,
};

export default function HeaderConContent({
  userName,
  userLogo,
}: IHeaderConContentProps) {
  return (
    <Header>
      <UserLogo src={userLogo ?? userImg} />
      <UserName>{userName}</UserName>
    </Header>
  );
}

HeaderConContent.defaultProps = defaultProps;

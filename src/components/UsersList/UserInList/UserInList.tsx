/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import styled from "styled-components";
import userLogo from "../../../assets/user.jpg";

const Container = styled(Link)`
  display: flex;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  padding: 8px 16px;
  cursor: pointer;
  position: relative;
  text-decoration: none;
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
  userId: string;
  userName: string;
  userFullName: string;
  userImg?: string;
  textInUser?: string;
  userImgSize?: string;
  fontSize?: string;
  offLink?: boolean;
  userInListOnClick?: () => void;
}

const defaultProps = {
  textInUser: null,
  userImgSize: null,
  fontSize: null,
  userImg: null,
  offLink: false,
  userInListOnClick: null,
};

export default function UserInList({
  userId,
  userName,
  userFullName,
  userImg,
  textInUser,
  userImgSize,
  fontSize,
  offLink,
  userInListOnClick,
}: IUserInListProps) {
  return (
    <Container
      to={offLink ? "" : `/u/${userId}/`}
      onClick={() => {
        if (userInListOnClick) userInListOnClick();
      }}
    >
      <UserImg
        src={userImg ?? userLogo}
        width={userImgSize}
        height={userImgSize}
      />
      <UserNameContainer>
        <UserName fontSize={fontSize}>{userName}</UserName>
        <UserFullName fontSize={fontSize}>{userFullName}</UserFullName>
      </UserNameContainer>
      {textInUser ? <UserText>{textInUser}</UserText> : null}
    </Container>
  );
}

UserInList.defaultProps = defaultProps;

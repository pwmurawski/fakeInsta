import styled from "styled-components";
import { Link } from "react-router-dom";
import { IConversationProps } from "../../../../interfaces/interfaces";

const ConversationLink = styled(Link)`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 72px;
  padding: 8px 20px;
  cursor: pointer;
  text-decoration: none;
  color: black;
  :hover {
    background-color: whitesmoke;
  }
`;
const UserImg = styled.img`
  margin-right: 12px;
  border-radius: 150px;
`;
const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const UserName = styled.div`
  font-size: 14px;
`;
const ActiveStatus = styled(UserName)`
  color: gray;
`;

export default function Conversation({
  id,
  userName,
  userImg,
}: IConversationProps) {
  return (
    <ConversationLink to={`/direct/t/${id}`}>
      <UserImg src={userImg} />
      <UserInfo>
        <UserName>{userName}</UserName>
        <ActiveStatus>Aktywny(a) dzisiaj</ActiveStatus>
      </UserInfo>
    </ConversationLink>
  );
}

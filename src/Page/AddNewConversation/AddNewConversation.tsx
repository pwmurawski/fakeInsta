import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import ExitSvg from "../../components/SvgIcon/AddNewMessage_SvgIcon";
import {
  ExitBtnModalWindow,
  ModalWindowWrapper,
} from "../../GlobalStyle/GlobalStyle";
import Modal from "../../hoc/Modal";
import UsersList from "../../components/UsersList/UsersList";

const AddNewMessageContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 400px;
  max-height: 611px;
  height: 100%;
  background-color: white;
  border-radius: 12px;
`;
const Header = styled.header`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 42px;
  border-bottom: 1px solid lightgray;
`;
const ExitBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 16px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
`;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;
const AddLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 32px;
  margin: 0 16px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  color: #0095f6;
`;

function AddNewMessage() {
  const navigate = useNavigate();
  const [usersListData, setUsersListData] = useState([
    {
      userId: "1",
      userName: "kowjan",
      userFullName: "Jan Kowalski",
    },
    {
      userId: "2",
      userName: "nowak123",
      userFullName: "Adam Nowak",
    },
  ]);

  return (
    <ModalWindowWrapper
      onClick={() => {
        navigate(-1);
      }}
    >
      <ExitBtnModalWindow>
        <ExitSvg color="white" width="25" height="25" />
      </ExitBtnModalWindow>
      <AddNewMessageContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <ExitBtn
            onClick={() => {
              navigate(-1);
            }}
          >
            <ExitSvg />
          </ExitBtn>
          <Title>Nowa wiadomość</Title>
          <AddLink to="/direct/t/100/">Dalej</AddLink>
        </Header>
        <UsersList usersListData={usersListData} offLink />
      </AddNewMessageContainer>
    </ModalWindowWrapper>
  );
}

export default Modal(AddNewMessage);

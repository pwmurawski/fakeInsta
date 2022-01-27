import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Btn,
  ModalWindowWrapper,
  HeaderCreatePost,
} from "../../GlobalStyle/GlobalStyle";
import {
  BackSvg,
  LocationSvg,
  EmoticonSvg,
} from "../../components/SvgIcon/CreateNewPost_SvgIcon";
import userImg from "../../assets/user.jpg";
import Modal from "../../hoc/Modal";

const NewPostContainer = styled.section`
  background-color: white;
  max-width: 1061px;
  width: 100%;
  max-height: 100%;
  height: fit-content;
  min-height: 764px;
  border-radius: 12px;
  transition: min-height 500ms;

  @media (max-width: 760px) {
    min-height: 500px;
  }
`;
const ShareBtn = styled.button`
  justify-self: flex-start;
  border: 0;
  margin-right: 10px;
  background: transparent;
  cursor: pointer;
  color: #0095f6;
  font-size: 14px;
  font-weight: 600;
`;
const headerHeight = "43px";
const Container = styled.section`
  display: flex;
  width: 100%;
  height: calc(100% - ${headerHeight});
`;
const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-bottom-left-radius: 12px;
  overflow: hidden;
`;
const Img = styled.img`
  max-width: 100%;
  height: auto;
`;
const Content = styled.section`
  display: flex;
  flex-direction: column;
  width: 340px;
  height: fit-content;

  @media (max-width: 680px) {
    flex: 1px;
    width: auto;
  }
`;
const User = styled.section`
  display: flex;
  align-items: center;
  height: 60px;
  margin: 0 16px;
  font-size: 16px;
  font-weight: 600;
`;
const UserImg = styled.img`
  width: 28px;
  height: 28px;
  margin-right: 12px;
`;
const AddDescription = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 168px;
  padding: 0 16px;
  border: 0;
  resize: none;
  font-size: 15px;
  letter-spacing: 1.2;
  font-family: inherit;
  :focus {
    outline: none;
  }
`;
const AddLocations = styled.section`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 45px;
  padding: 0 16px 0 8px;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
`;
const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 38px;
  border: 0;
  padding: 4px 9px;
  background: transparent;
  font-size: 16px;
  :focus {
    outline: none;
  }
`;
const FooterDesc = styled.section`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  padding: 4px 16px;
`;
const NumberChar = styled.div`
  font-size: 12px;
  color: lightgray;
`;
export const H1 = styled.h1`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

interface ILocationState {
  state?: {
    uploadImg: string;
  };
}

function DetailsNewPost() {
  const [descTextLength, setDescTextLength] = useState(0);
  const navigate = useNavigate();
  const { state } = useLocation() as ILocationState;

  return (
    <ModalWindowWrapper
      onClick={() => {
        navigate(-2);
      }}
    >
      <NewPostContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <HeaderCreatePost justify="space-between">
          <Btn
            onClick={() => {
              navigate(-1);
            }}
          >
            <BackSvg />
          </Btn>
          <H1>Utwórz nowy post</H1>
          <ShareBtn>Udostępnij</ShareBtn>
        </HeaderCreatePost>
        <Container>
          <ImgContainer>
            <Img src={state?.uploadImg} />
          </ImgContainer>
          <Content>
            <User>
              <UserImg src={userImg} />
              pwmurawski123
            </User>
            <AddDescription
              onChange={(e) => {
                setDescTextLength(e.target.textLength);
              }}
              placeholder="Dodaj opis…"
              spellCheck={false}
              maxLength={2200}
            />
            <FooterDesc>
              <EmoticonSvg />
              <NumberChar>{`${descTextLength}/2 200`}</NumberChar>
            </FooterDesc>
            <AddLocations>
              <Input placeholder="Dodaj lokalizację" />
              <LocationSvg />
            </AddLocations>
          </Content>
        </Container>
      </NewPostContainer>
    </ModalWindowWrapper>
  );
}

export default Modal(DetailsNewPost);

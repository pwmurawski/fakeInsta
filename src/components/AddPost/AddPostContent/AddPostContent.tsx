import styled from "styled-components";
import { useState } from "react";
import {
  LocationSvg,
  EmoticonSvg,
} from "../../../components/SvgIcon/CreateNewPost_SvgIcon";
import userImg from "../../../assets/user.jpg";
import { IAddPostContentProps } from "../../../interfaces/interfaces";

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

export default function AddPostContent({
  newPostData,
  setNewPostData,
}: IAddPostContentProps) {
  const [descTextLength, setDescTextLength] = useState(0);

  return (
    <Content>
      <User>
        <UserImg src={newPostData.user.logo ?? userImg} />
        {newPostData.user.userName}
      </User>
      <AddDescription
        onChange={(e) => {
          setDescTextLength(e.target.textLength);
          setNewPostData({ ...newPostData, desc: e.target.value });
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
        <Input
          placeholder="Dodaj lokalizację"
          onChange={(e) => {
            setNewPostData({ ...newPostData, location: e.target.value });
          }}
        />
        <LocationSvg />
      </AddLocations>
    </Content>
  );
}

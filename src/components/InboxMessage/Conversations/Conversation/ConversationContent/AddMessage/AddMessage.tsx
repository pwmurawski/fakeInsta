/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useState } from "react";
import { EmoticonSvg } from "../../../../../SvgIcon/CreateNewPost_SvgIcon";
import ImgSvg from "../../../../../SvgIcon/Message_SvgIcon";

const AddMessageCon = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  padding: 20px;
`;
const TextContainer = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  border: 1px solid lightgray;
  border-radius: 22px;
  padding: 0 10px;
`;
const NewMessage = styled.textarea`
  box-sizing: border-box;
  flex: 1;
  max-height: 106px;
  height: 34px;
  min-height: 34px;
  padding: 8px 4px;
  border: 0;
  resize: none;
  letter-spacing: 1.2;
  font-family: inherit;
  overflow: auto;
  :focus {
    outline: none;
  }
`;
const SvgCon = styled.button`
  background: transparent;
  border: 0;
  width: 40px;
  height: 40px;
  padding: 8px;
  cursor: pointer;
`;
const BtnSend = styled.button`
  width: 40px;
  padding: 0;
  margin-left: 5px;
  border: 0;
  background: transparent;
  color: #0095f6;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

interface IAddMessageProps {
  onNewMessage: (newMessage: string) => void;
}

export default function AddMessage({ onNewMessage }: IAddMessageProps) {
  const [newMessageData, setNewMessageData] = useState("");

  const newMessageOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessageData(e.target.value);
    e.target.style.height = "34px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <AddMessageCon>
      <TextContainer>
        <SvgCon>
          <EmoticonSvg color="rgb(38, 38, 38)" width="24" height="24" />
        </SvgCon>
        <NewMessage
          value={newMessageData}
          onChange={newMessageOnChange}
          placeholder="Wyślij wiadomość..."
        />
        {newMessageData ? (
          <BtnSend
            onClick={() => {
              onNewMessage(newMessageData);
              setNewMessageData("");
            }}
          >
            Wyślij
          </BtnSend>
        ) : (
          <SvgCon>
            <ImgSvg />
          </SvgCon>
        )}
      </TextContainer>
    </AddMessageCon>
  );
}

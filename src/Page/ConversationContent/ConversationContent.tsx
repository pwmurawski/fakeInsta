import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { EmoticonSvg } from "../../components/SvgIcon/CreateNewPost_SvgIcon";
import ImgSvg from "../../components/SvgIcon/Message_SvgIcon";
import Messages from "../../components/Conversations/Messages/Messages";
import { UserLogo } from "../../GlobalStyle/GlobalStyle";
import userImg from "../../assets/user.jpg";

const Container = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;
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
const ContainerContent = styled.div`
  flex: 1px;
  display: flex;
  align-items: flex-end;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;
const Content = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100%;
  height: fit-content;
  padding: 20px 20px 0;
`;
const AddMessage = styled.div`
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

export default function ConversationContent() {
  const [newMessageData, setNewMessageData] = useState("");
  const containerContentRef = useRef<HTMLDivElement | null>(null);
  const [messagesData, setMessagesData] = useState({
    userName: "pwmurawski123",
    userImg,
    messages: [
      {
        id: 1,
        text: "siema",
      },
      {
        id: 2,
        your: true,
        text: "elsodadadd",
      },
      {
        id: 3,
        your: true,
        text: "elsodadadd",
      },
      {
        id: 4,
        text: "elsodadadd",
      },
    ],
  });

  const newMessageOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessageData(e.target.value);
    e.target.style.height = "34px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const scrollDownHandler = () => {
    const heightScroll = containerContentRef.current?.scrollHeight;
    const heightClient = containerContentRef.current?.clientHeight;
    if (heightScroll && heightClient) {
      if (heightScroll > heightClient) {
        containerContentRef.current?.scrollTo({
          top: heightScroll - heightClient,
        });
      }
    }
  };

  useEffect(() => {
    scrollDownHandler();
  }, [messagesData]);

  return (
    <Container>
      <Header>
        <UserLogo src={messagesData.userImg} />
        <UserName>{messagesData.userName}</UserName>
      </Header>
      <ContainerContent ref={containerContentRef}>
        <Content>
          <Messages
            messagesData={messagesData.messages}
            userImg={messagesData.userImg}
          />
        </Content>
      </ContainerContent>
      <AddMessage>
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
                setMessagesData({
                  ...messagesData,
                  messages: [
                    ...messagesData.messages,
                    { id: Math.random(), your: true, text: newMessageData },
                  ],
                });
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
      </AddMessage>
    </Container>
  );
}

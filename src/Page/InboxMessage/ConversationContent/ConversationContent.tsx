import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Messages from "../../../components/InboxMessage/Conversations/Conversation/ConversationContent/Messages/Messages";
import AddMessage from "../../../components/InboxMessage/Conversations/Conversation/ConversationContent/AddMessage/AddMessage";
import HeaderConContent from "../../../components/InboxMessage/Conversations/Conversation/ConversationContent/HeaderConContent/HeaderConContent";

const Container = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
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

interface IMessagesData {
  userName: string;
  userImg?: string;
  messages: (
    | {
        id: number;
        text: string;
        your?: undefined;
      }
    | {
        id: number;
        your: boolean;
        text: string;
      }
  )[];
}

export default function ConversationContent() {
  const containerContentRef = useRef<HTMLDivElement | null>(null);
  const [messagesData, setMessagesData] = useState<IMessagesData>({
    userName: "user",
    messages: [
      {
        id: 1,
        text: "message1",
      },
      {
        id: 2,
        your: true,
        text: "message2",
      },
      {
        id: 3,
        your: true,
        text: "message3",
      },
      {
        id: 4,
        text: "message4",
      },
    ],
  });

  const addNewMessage = (newMessage: string) => {
    setMessagesData({
      ...messagesData,
      messages: [
        ...messagesData.messages,
        { id: Math.random(), your: true, text: newMessage },
      ],
    });
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
      <HeaderConContent
        userName={messagesData.userName}
        userLogo={messagesData.userImg}
      />
      <ContainerContent ref={containerContentRef}>
        <Content>
          <Messages
            messagesData={messagesData.messages}
            userLogo={messagesData.userImg}
          />
        </Content>
      </ContainerContent>
      <AddMessage onNewMessage={addNewMessage} />
    </Container>
  );
}

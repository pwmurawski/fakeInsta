import styled from "styled-components";
import Messages from "../../../components/InboxMessage/Conversations/Conversation/ConversationContent/Messages/Messages";
import AddMessage from "../../../components/InboxMessage/Conversations/Conversation/ConversationContent/AddMessage/AddMessage";
import HeaderConContent from "../../../components/InboxMessage/Conversations/Conversation/ConversationContent/HeaderConContent/HeaderConContent";
import useMessage from "../../../hooks/useMessage";

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

export default function ConversationContent() {
  const [messagesData, addMessage, containerContentRef] = useMessage();

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
      <AddMessage onNewMessage={addMessage} />
    </Container>
  );
}

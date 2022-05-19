import { IConversationsProps } from "../../../interfaces/interfaces";
import Conversation from "./Conversation/Conversation";

export default function Conversations({
  conversationsData,
}: IConversationsProps) {
  return (
    <>
      {conversationsData.map((conversation) => (
        <Conversation
          key={conversation.id}
          id={conversation.id}
          userName={conversation.userName}
          userImg={conversation.userImg}
        />
      ))}
    </>
  );
}

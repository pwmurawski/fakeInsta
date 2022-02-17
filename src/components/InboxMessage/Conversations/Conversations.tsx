import Conversation from "./Conversation/Conversation";

interface IConversationsProps {
  conversationsData: {
    id: number;
    userName: string;
    userImg: string;
  }[];
}

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

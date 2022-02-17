import styled from "styled-components";
import userImg from "../../../../../../assets/user.jpg";

const MessageContainer = styled.div`
  display: flex;
`;
const Message = styled.article`
  box-sizing: border-box;
  max-width: 100%;
  width: fit-content;
  min-height: fit-content;
  padding: 12px;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 30px;
  margin-bottom: 8px;
  font-size: 14px;
  word-wrap: break-word;
`;
const UserImg = styled.img`
  display: flex;
  justify-content: center;
  align-self: flex-end;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  margin-bottom: 8px;
`;
const YourMessage = styled(Message)`
  align-self: flex-end;
  background-color: lightgray;
`;

interface IMessagesProps {
  messagesData: (
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
  userLogo?: string;
}

const defaultProps = {
  userLogo: null,
};

export default function Messages({ messagesData, userLogo }: IMessagesProps) {
  return (
    <>
      {messagesData.map((mess) =>
        mess.your ? (
          <YourMessage key={mess.id}>{mess.text}</YourMessage>
        ) : (
          <MessageContainer key={mess.id}>
            <UserImg src={userLogo ?? userImg} />
            <Message>{mess.text}</Message>
          </MessageContainer>
        )
      )}
    </>
  );
}

Messages.defaultProps = defaultProps;

import styled from "styled-components";
import { Route, Routes, useLocation } from "react-router-dom";
import ConversationContent from "./ConversationContent/ConversationContent";
import AddConversationInfo from "../../components/InboxMessage/AddConversationInfo/AddConversationInfo";
import ConversationList from "../../components/InboxMessage/ConversationList/ConversationList";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  height: fit-content;
`;
const InboxContainer = styled.section`
  display: flex;
  max-width: 935px;
  width: 100%;
  height: 85vh;
  margin: 0 20px;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 4px;
  @media (max-width: 935px) {
    margin: 0;
  }
`;

interface ILocationState {
  state?: {
    background: string;
  };
}

export default function InboxMessage() {
  const { state } = useLocation() as ILocationState;
  const background = state?.background;

  return (
    <Wrapper>
      <InboxContainer>
        <ConversationList />
        <Routes location={background}>
          <Route path="inbox" element={<AddConversationInfo />} />
          <Route path="t/:id" element={<ConversationContent />} />
        </Routes>
      </InboxContainer>
    </Wrapper>
  );
}

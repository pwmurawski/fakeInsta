import styled from "styled-components";
import loadingImg from "../../../assets/loadingImg.png";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
`;
const Img = styled.img`
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  animation: rotation 1s infinite ease-in-out;
`;

export default function LoadingIcon() {
  return (
    <Wrapper>
      <Img src={loadingImg} />
    </Wrapper>
  );
}

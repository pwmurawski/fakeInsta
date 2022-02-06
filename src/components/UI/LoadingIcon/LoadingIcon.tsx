import styled from "styled-components";
import loadingImg from "../../../assets/loadingImg.png";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
  margin-top: ${({ marginTop }: { marginTop?: string }) => marginTop};
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

const defaultProps = {
  marginTop: "none",
};

export default function LoadingIcon({ marginTop }: { marginTop?: string }) {
  return (
    <Wrapper marginTop={marginTop}>
      <Img src={loadingImg} />
    </Wrapper>
  );
}

LoadingIcon.defaultProps = defaultProps;

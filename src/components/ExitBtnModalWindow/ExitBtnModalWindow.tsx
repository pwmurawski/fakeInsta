import styled from "styled-components";
import ExitSvg from "../../components/SvgIcon/AddNewMessage_SvgIcon";

const ExitBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: fit-content;
  height: fit-content;
  background: transparent;
  border: 0;
  cursor: pointer;
`;

export default function ExitBtnModalWindow() {
  return (
    <ExitBtn>
      <ExitSvg color="white" width="25" height="25" />
    </ExitBtn>
  );
}

import styled from "styled-components";

export const AddComment = styled.section`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  padding: 6px 8px;
  border-top: 1px solid lightgray;
`;
export const InputComment = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  max-height: 106px;
  height: 25px;
  min-height: 25px;
  background: transparent;
  border: 0;
  outline: 0;
  resize: none;
  letter-spacing: 1.2;
  font-family: inherit;
  overflow: auto;
  cursor: pointer;
`;
export const BtnSubmit = styled.button`
  background: transparent;
  border: 0;
  font-size: 13px;
  font-weight: bold;
  color: #0095f6;
  cursor: pointer;
`;

import styled from "styled-components";

export const NewPostContainer = styled.section`
  background-color: white;
  max-width: 721px;
  width: 100%;
  height: 764px;
  border-radius: 12px;
  transition: height 500ms;

  @media (max-width: 760px) {
    height: 500px;
  }
`;
export const H1 = styled.h1`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;
export const Content = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 43px);
  padding: 24px;
  position: relative;
`;
export const H2 = styled.h2`
  height: 26px;
  margin-top: 10px;
  margin-bottom: 0;
  font-size: 22px;
  font-weight: 300;
`;
export const BtnChooseFile = styled.button`
  background-color: #0095f6;
  width: 154px;
  height: 30px;
  padding: 5px 9px;
  margin-top: 29px;
  border: 0;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  z-index: 1;
`;
export const Input = styled.input`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
`;

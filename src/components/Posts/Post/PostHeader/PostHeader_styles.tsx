import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  height: 70px;
  padding: 0 8px;
`;
export const User = styled.div`
  display: flex;
  padding: 14px 4px 14px 0;
  overflow: hidden;
`;
export const UserName = styled.h2`
  display: flex;
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 0 14px;
  cursor: pointer;
`;
export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const Location = styled.a`
  font-size: 11px;
  margin: 0 0 0 14px;
  cursor: pointer;
`;

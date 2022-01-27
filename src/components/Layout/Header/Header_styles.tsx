import styled from "styled-components";

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 975px;
  height: 100%;
  padding: 0 12px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const Logo = styled.div`
  flex: 1;
  min-width: 127px;
  display: flex;
  height: 45px;
  align-items: flex-end;
  @media (max-width: 404px) {
    min-width: 0;
  }
`;

export const Search = styled.div`
  max-width: 268px;
  width: 100%;
  min-width: 181px;

  @media (max-width: 640px) {
    display: none;
  }
`;

export const Menu = styled.nav`
  flex: 1;
  min-width: 278px;

  @media (max-width: 500px) {
    min-width: 254px;
  }
  @media (max-width: 404px) {
    min-width: 0;
  }
`;

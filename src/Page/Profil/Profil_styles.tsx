import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserLogo } from "../../GlobalStyle/GlobalStyle";

export const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: fit-content;
`;
export const ProfilContainer = styled.section`
  box-sizing: border-box;
  max-width: 935px;
  width: 100%;
  padding: 0 20px;
  @media (max-width: 735px) {
    padding: 0;
  }
`;
export const Header = styled.header`
  display: flex;
  align-items: center;
  max-width: 100%;
  height: fit-content;
  margin: 0 0 44px;

  @media (max-width: 735px) {
    margin: 16px 16px 24px;
    height: fit-content;
  }
`;
export const UserImg = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  max-width: 291px;
  width: 100%;
  margin-right: 30px;
  flex-shrink: 2;
  @media (max-width: 735px) {
    width: fit-content;
    height: fit-content;
    margin-right: 28px;
  }
`;
export const Img = styled(UserLogo)`
  width: 150px;
  height: 150px;
  border-radius: 150px;
  @media (max-width: 735px) {
    width: 77px;
    height: 77px;
  }
`;
export const ContentHeader = styled.div`
  flex-shrink: 1;
  width: 100%;
  height: 100%;
`;
export const User = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  @media (max-width: 735px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0;
    height: fit-content;
  }
`;
export const UserName = styled.h2`
  width: fit-content;
  font-size: 28px;
  font-weight: 200;
  margin: 0;
  @media (max-width: 735px) {
    margin-bottom: 12px;
  }
`;
export const UserEditLink = styled(Link)`
  box-sizing: border-box;
  width: 97px;
  height: 30px;
  padding: 4px 9px;
  margin-left: 20px;
  background: transparent;
  border: 1px solid lightgray;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  color: black;
  text-align: center;
  text-decoration: none;

  @media (max-width: 735px) {
    max-width: 250px;
    width: 100%;
    margin: 0;
  }
`;

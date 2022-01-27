import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

export const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: fit-content;
`;
export const ProfilContainer = styled.section`
  width: fit-content;
  padding: 0 20px;
  @media (max-width: 735px) {
    padding: 0;
  }
`;
export const Header = styled.header`
  display: flex;
  align-items: center;
  max-width: 100%;
  height: 150px;
  margin: 0 0 44px;

  @media (max-width: 735px) {
    margin: 16px 16px 24px;
    height: 82px;
  }
`;
export const Options = styled.section`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 53px;
  border-top: 1px solid lightgray;
  @media (max-width: 735px) {
    height: 44px;
    border-bottom: 1px solid lightgray;
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
export const Img = styled.img`
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
  font-size: 14px;
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
export const UserFullName = styled.h1`
  margin: 0;
  font-size: 16px;
  font-weight: 600;

  @media (max-width: 735px) {
    padding: 0 16px 21px;
    font-size: 14px;
  }
`;
export const UserStats = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  height: 18px;
  margin-bottom: 20px;

  @media (max-width: 735px) {
    box-sizing: border-box;
    justify-content: center;
    height: 61px;
    padding: 12px 0;
    margin-bottom: 0;
    border-top: 1px solid lightgray;
  }
`;
export const Stat = styled.div`
  margin-right: 40px;

  @media (max-width: 735px) {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 0;
    font-size: 14px;
    color: gray;
  }
`;
export const StatValue = styled.span`
  font-weight: 600;
  @media (max-width: 735px) {
    color: black;
  }
`;
export const OptionsLink = styled(NavLink)`
  box-sizing: border-box;
  display: flex;
  height: 100%;
  align-items: center;
  margin-right: 60px;
  text-decoration: none;
  border-top: 1px solid transparent;
  :last-of-type {
    margin-right: 0;
  }
  &.active {
    border-top: 1px solid black;
  }
  @media (max-width: 735px) {
    justify-content: center;
    flex: 1;
    margin-right: 0;
    &.active {
      border-top: 0;
    }
  }
`;
export const OptionsLinkText = styled.span`
  margin-left: 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.2px;
  color: gray;
  .active & {
    color: black;
  }
  @media (max-width: 735px) {
    display: none;
  }
`;
export const SavedPostsInfo = styled.p`
  box-sizing: border-box;
  height: 48px;
  padding: 16px;
  margin: 0;
  font-size: 12px;
  color: gray;
`;
export const Svg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12px;
  height: 12px;
  padding-bottom: 1px;

  @media (max-width: 735px) {
    width: 24px;
    height: 24px;
  }
`;

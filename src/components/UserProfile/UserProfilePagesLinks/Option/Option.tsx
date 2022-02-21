/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const OptionsLink = styled(NavLink)`
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
const OptionsLinkText = styled.span`
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
const Svg = styled.div`
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

interface IOptionProps {
  url: string;
  text: string;
  SvgIcon: ({ color }: { color: string | undefined }) => JSX.Element;
}

export default function Option({ url, text, SvgIcon }: IOptionProps) {
  return (
    <OptionsLink to={url}>
      {({ isActive }) => (
        <>
          <Svg>
            <SvgIcon color={isActive ? "#262626" : undefined} />
          </Svg>
          <OptionsLinkText>{text}</OptionsLinkText>
        </>
      )}
    </OptionsLink>
  );
}

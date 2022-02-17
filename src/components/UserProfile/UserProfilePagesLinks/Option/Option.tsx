import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  PostsSvg,
  SavedSvg,
  TaggedSvg,
} from "../../../SvgIcon/ProfilPage_SvgIcon";

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
  icon: string;
}

export default function Option({ url, text, icon }: IOptionProps) {
  return (
    <OptionsLink to={url}>
      {({ isActive }) => (
        <>
          <Svg>
            {icon === "post" && (
              <PostsSvg color={isActive ? "#262626" : undefined} />
            )}
            {icon === "save" && (
              <SavedSvg color={isActive ? "#262626" : undefined} />
            )}
            {icon === "tagg" && (
              <TaggedSvg color={isActive ? "#262626" : undefined} />
            )}
          </Svg>
          <OptionsLinkText>{text}</OptionsLinkText>
        </>
      )}
    </OptionsLink>
  );
}

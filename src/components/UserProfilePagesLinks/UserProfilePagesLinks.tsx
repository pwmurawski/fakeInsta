import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { PostsSvg, TaggedSvg, SavedSvg } from "../SvgIcon/ProfilPage_SvgIcon";

const Container = styled.section`
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

const defaultProps = {
  savedPageDisabled: false,
};

export default function UserProfilePagesLinks({
  baseUrl,
  savedPageDisabled,
}: {
  baseUrl: string;
  savedPageDisabled?: boolean;
}) {
  return (
    <Container>
      <OptionsLink to={baseUrl}>
        {({ isActive }) => (
          <>
            <Svg>
              <PostsSvg color={isActive ? "#262626" : undefined} />
            </Svg>
            <OptionsLinkText>POSTY</OptionsLinkText>
          </>
        )}
      </OptionsLink>
      {savedPageDisabled ? null : (
        <OptionsLink to="saved/">
          {({ isActive }) => (
            <>
              <Svg>
                <SavedSvg color={isActive ? "#262626" : undefined} />
              </Svg>
              <OptionsLinkText>ZAPISANE</OptionsLinkText>
            </>
          )}
        </OptionsLink>
      )}
      <OptionsLink to="tagged/">
        {({ isActive }) => (
          <>
            <Svg>
              <TaggedSvg color={isActive ? "#262626" : undefined} />
            </Svg>
            <OptionsLinkText>Z OZNACZENIEM</OptionsLinkText>
          </>
        )}
      </OptionsLink>
    </Container>
  );
}

UserProfilePagesLinks.defaultProps = defaultProps;

import styled from "styled-components";
import Option from "./Option/Option";
import {
  PostsSvg,
  SavedSvg,
  TaggedSvg,
} from "../../SvgIcon/ProfilPage_SvgIcon";

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
      <Option url={baseUrl} text="POSTY" SvgIcon={PostsSvg} />
      {savedPageDisabled ? null : (
        <Option url="saved/" text="ZAPISANE" SvgIcon={SavedSvg} />
      )}
      <Option url="tagged/" text="Z OZNACZENIEM" SvgIcon={TaggedSvg} />
    </Container>
  );
}

UserProfilePagesLinks.defaultProps = defaultProps;

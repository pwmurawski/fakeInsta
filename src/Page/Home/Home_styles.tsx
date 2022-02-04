import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  height: fit-content;
  grid-template-columns: minmax(0, 1fr) 614px 300px minmax(0, 1fr);
  grid-template-rows: 435px 125px 6fr;
  grid-column-gap: 28px;
  grid-template-areas:
    ". content asideContainer ."
    ". content footerContainer ."
    ". content . .";

  @media (max-width: 1000px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 614px) minmax(0, 1fr);
    grid-template-rows: 500%;
    grid-column-gap: 0;
    grid-template-areas: ". content .";
  }
`;

export const Content = styled.section`
  grid-area: content;
`;

export const AsideContainer = styled.aside`
  grid-area: asideContainer;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export const FooterContainer = styled.footer`
  grid-area: footerContainer;
  display: flex;
  padding-top: 10px;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 10px;
  color: grey;

  @media (max-width: 1000px) {
    display: none;
  }
`;

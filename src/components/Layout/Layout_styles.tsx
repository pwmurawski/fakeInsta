import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  overflow: hidden;
  grid-template-columns: 100%;
  grid-template-rows: 60px 30fr 1fr;
  grid-column-gap: 28px;
  grid-template-areas:
    "header "
    "content"
    "footerContainer";
`;

export const Header = styled.header`
  grid-area: header;
  display: flex;
  justify-content: center;
  background-color: white;
  border-bottom: 1px solid lightgray;
`;

export const Content = styled.main`
  grid-area: content;
  padding-top: 30px;
  overflow-y: scroll;

  @media (min-width: 640px) {
    ::-webkit-scrollbar {
      width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: whitesmoke;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #b13fce;
      border-radius: 20px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }

  @media (max-width: 640px) {
    padding-top: 0;
  }
`;

export const FooterContainer = styled.footer`
  grid-area: footerContainer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  color: gray;
`;

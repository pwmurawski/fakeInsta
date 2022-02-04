import styled from "styled-components";
import noSavedPostsImg from "../../../assets/save.png";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
  margin-top: 60px;
`;
const Img = styled.img`
  width: 80px;
  height: 80px;
`;
const H1 = styled.h1`
  font-size: 28px;
  font-weight: 300;
  margin: 10px 0 10px;
`;
const Desc = styled.span`
  text-align: center;
  width: 350px;
  font-size: 14px;
`;

export default function NoSavedPosts() {
  return (
    <Wrapper>
      <Img src={noSavedPostsImg} />
      <H1>Zapisz</H1>
      <Desc>
        Zapisuj zdjęcia i filmy, które chcesz zobaczyć ponownie. Nikt nie
        zostanie o tym powiadomiony i tylko Ty zobaczysz, co zostało zapisane.
      </Desc>
    </Wrapper>
  );
}

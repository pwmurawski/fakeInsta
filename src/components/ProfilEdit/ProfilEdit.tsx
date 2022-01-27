import styled from "styled-components";
import {
  UserLogo,
  HeaderProfilSet,
  UserNameContainer,
  UserName,
  EditUserImgBtn,
  Form,
  Aside,
  EditContainer,
  Input,
  InputContainer,
  Label,
  SubmitBtn,
} from "../../GlobalStyle/GlobalStyle";
import userLogo from "../../assets/user.jpg";

const InputArea = styled.textarea`
  box-sizing: border-box;
  width: 355px;
  height: 60px;
  min-height: 60px;
  padding: 6px 10px;
  margin: 0;
  border: 1px solid lightgray;
  border-radius: 3px;
  font-size: 15px;
  resize: vertical;
  font-family: inherit;
`;
const Description = styled.div`
  color: gray;
  font-size: 12px;
  max-width: 355px;
  margin: 16px 0 8px 0;
`;
const HeadText = styled.h2`
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 4px;
`;

export default function ProfilEdit() {
  return (
    <>
      <HeaderProfilSet>
        <UserLogo width={38} height={38} src={userLogo} />
        <UserNameContainer>
          <UserName>pwmurawski123</UserName>
          <EditUserImgBtn>Zmień zdjęcie profilowe</EditUserImgBtn>
        </UserNameContainer>
      </HeaderProfilSet>
      <Form>
        <EditContainer>
          <Aside>
            <Label htmlFor="userFullName">Imię i nazwisko</Label>
          </Aside>
          <InputContainer>
            <Input id="userFullName" placeholder="Imię i nazwisko" />
            <Description>
              Pomóż ludziom odkryć Twoje konto, korzystając ze znanej im nazwy —
              może to być Twoje imię i nazwisko, nick lub nazwa firmy. Nazwę
              możesz zmienić tylko dwa razy w ciągu 14 dni.
            </Description>
          </InputContainer>
        </EditContainer>
        <EditContainer>
          <Aside>
            <Label htmlFor="userName">Nazwa użytkownika</Label>
          </Aside>
          <InputContainer>
            <Input id="userName" placeholder="Nazwa użytkownika" />
            <Description>
              W większości przypadków będzie można zmienić nazwę użytkownika z
              powrotem na pwmurawski123 na kolejne 14 dni. Więcej informacji
            </Description>
          </InputContainer>
        </EditContainer>
        <EditContainer>
          <Aside>
            <Label htmlFor="website">Witryna internetowa</Label>
          </Aside>
          <InputContainer>
            <Input id="website" placeholder="Witryna internetowa" />
          </InputContainer>
        </EditContainer>
        <EditContainer>
          <Aside>
            <Label htmlFor="bio">Biogram</Label>
          </Aside>
          <InputContainer>
            <InputArea id="bio" />
          </InputContainer>
        </EditContainer>
        <EditContainer>
          <Aside />
          <InputContainer>
            <Description>
              <HeadText>Informacje osobiste</HeadText> Podaj informacje
              osobiste, nawet jeśli konto służy do celów biznesowych, jest
              kontem dla zwierzaka itp. Nie będą one udostępniane w Twoim
              profilu publicznym.
            </Description>
          </InputContainer>
        </EditContainer>
        <EditContainer>
          <Aside>
            <Label htmlFor="e-mail">Adres e-mail</Label>
          </Aside>
          <InputContainer>
            <Input id="e-mail" placeholder="Adres e-mail" />
          </InputContainer>
        </EditContainer>
        <EditContainer>
          <Aside>
            <Label htmlFor="num">Numer telefonu</Label>
          </Aside>
          <InputContainer>
            <Input id="num" placeholder="Numer telefonu" />
          </InputContainer>
        </EditContainer>
        <EditContainer>
          <Aside>
            <Label htmlFor="sex">Płeć</Label>
          </Aside>
          <InputContainer>
            <Input id="sex" placeholder="Płeć" />
          </InputContainer>
        </EditContainer>
        <EditContainer>
          <Aside />
          <SubmitBtn type="submit">Wyślij</SubmitBtn>
        </EditContainer>
      </Form>
    </>
  );
}

import {
  UserLogo,
  HeaderProfilSet,
  UserNameContainer,
  UserName,
  Form,
  Aside,
  EditContainer,
  Input,
  InputContainer,
  Label,
  SubmitBtn,
} from "../../GlobalStyle/GlobalStyle";
import userLogo from "../../assets/user.jpg";

export default function ProfilChangePass() {
  return (
    <>
      <HeaderProfilSet marginBottom="32px">
        <UserLogo width="38px" height="38px" src={userLogo} />
        <UserNameContainer>
          <UserName fontSize="24px">pwmurawski123</UserName>
        </UserNameContainer>
      </HeaderProfilSet>
      <Form>
        <EditContainer>
          <Aside>
            <Label htmlFor="prepass">Poprzednie hasło</Label>
          </Aside>
          <InputContainer>
            <Input type="password" id="prepass" changePass />
          </InputContainer>
        </EditContainer>
        <EditContainer>
          <Aside>
            <Label htmlFor="newpass">Nowe hasło</Label>
          </Aside>
          <InputContainer>
            <Input type="password" id="newpass" changePass />
          </InputContainer>
        </EditContainer>
        <EditContainer>
          <Aside>
            <Label htmlFor="newpassconfirm">Potwierdź nowe hasło</Label>
          </Aside>
          <InputContainer>
            <Input type="password" id="newpassconfirm" changePass />
          </InputContainer>
        </EditContainer>
        <EditContainer>
          <Aside />
          <SubmitBtn type="submit">Zmień hasło</SubmitBtn>
        </EditContainer>
      </Form>
    </>
  );
}

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
} from "../../../../GlobalStyle/GlobalStyle";
import userLogo from "../../../../assets/user.jpg";
import { IProfilChangePassProps } from "../../../../interfaces/interfaces";
import useChangePassword from "../../../../hooks/useChangePassword";

export default function ProfilChangePass({ user }: IProfilChangePassProps) {
  const [newPass, setNewPass, changePassword] = useChangePassword();

  return (
    <>
      <HeaderProfilSet marginBottom="32px">
        <UserLogo width="38px" height="38px" src={user.logo ?? userLogo} />
        <UserNameContainer>
          <UserName fontSize="24px">{user.userName}</UserName>
        </UserNameContainer>
      </HeaderProfilSet>
      <Form onSubmit={changePassword}>
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
            <Input
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              type="password"
              id="newpass"
              changePass
            />
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

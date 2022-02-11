import { useState } from "react";
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
import useAuth from "../../../../hooks/useAuth";
import FetchAuth from "../../../../helpers/Fetch/FetchAuth";

interface IProfilChangePassProps {
  user: {
    userName: string;
    logo?: string;
  };
}

export default function ProfilChangePass({ user }: IProfilChangePassProps) {
  const [auth, setAuth] = useAuth();
  const [newPass, setNewPass] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (auth) {
      FetchAuth(
        "accounts:update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: auth.token,
            password: newPass,
            returnSecureToken: false,
          }),
        },
        (res) => {
          setAuth(true, {
            email: res.email,
            token: res.idToken,
            userId: res.localId,
          });
          // console.log(res);
        }
      );
    }
  };

  return (
    <>
      <HeaderProfilSet marginBottom="32px">
        <UserLogo width="38px" height="38px" src={user.logo ?? userLogo} />
        <UserNameContainer>
          <UserName fontSize="24px">{user.userName}</UserName>
        </UserNameContainer>
      </HeaderProfilSet>
      <Form onSubmit={submit}>
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

import styled from "styled-components";
import { useState } from "react";
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
} from "../../../../GlobalStyle/GlobalStyle";
import userLogo from "../../../../assets/user.jpg";
import useAuth from "../../../../hooks/useAuth";
import { fetchAuthEditAccountData } from "../../../../api/authQuery";
import { IProfilEditProps } from "../../../../interfaces/interfaces";
import { fetchEditUserData } from "../../../../api/userQuery";

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

const Error = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 30px;
  font-size: 13px;
  color: red;
`;

export default function ProfilEdit({
  userData,
  setUserData,
}: IProfilEditProps) {
  const [auth, setAuth] = useAuth();
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetchEditUserData(userData.userId, userData.id, {
      ...userData,
      id: undefined,
    });

    if (auth) {
      const res = await fetchAuthEditAccountData({
        idToken: auth.token,
        email: userData.email,
        returnSecureToken: false,
      });

      if (res) {
        setAuth(true, {
          email: res.email,
          token: res.idToken,
          userId: res.localId,
        });
        if (res.error) {
          setError(res.error.errors[0].message);
        }
      }
    }
  };

  return (
    <>
      <HeaderProfilSet>
        <UserLogo width={38} height={38} src={userData.logo ?? userLogo} />
        <UserNameContainer>
          <UserName>{userData.userName}</UserName>
          <EditUserImgBtn>Zmie?? zdj??cie profilowe</EditUserImgBtn>
        </UserNameContainer>
      </HeaderProfilSet>
      <Form onSubmit={submit}>
        <EditContainer>
          <Aside>
            <Label htmlFor="userFullName">Imi?? i nazwisko</Label>
          </Aside>
          <InputContainer>
            <Input
              id="userFullName"
              placeholder="Imi?? i nazwisko"
              value={userData.userFullName}
              onChange={(e) =>
                setUserData({ ...userData, userFullName: e.target.value })
              }
            />
            <Description>
              Pom???? ludziom odkry?? Twoje konto, korzystaj??c ze znanej im nazwy ???
              mo??e to by?? Twoje imi?? i nazwisko, nick lub nazwa firmy. Nazw??
              mo??esz zmieni?? tylko dwa razy w ci??gu 14 dni.
            </Description>
          </InputContainer>
        </EditContainer>
        <EditContainer>
          <Aside>
            <Label htmlFor="userName">Nazwa u??ytkownika</Label>
          </Aside>
          <InputContainer>
            <Input
              id="userName"
              placeholder="Nazwa u??ytkownika"
              value={userData.userName}
              onChange={(e) =>
                setUserData({ ...userData, userName: e.target.value })
              }
            />
            <Description>
              W wi??kszo??ci przypadk??w b??dzie mo??na zmieni?? nazw?? u??ytkownika z
              powrotem na pwmurawski123 na kolejne 14 dni. Wi??cej informacji
            </Description>
          </InputContainer>
        </EditContainer>
        <EditContainer>
          <Aside>
            <Label htmlFor="website">Witryna internetowa</Label>
          </Aside>
          <InputContainer>
            <Input
              id="website"
              placeholder="Witryna internetowa"
              value={userData.website}
              onChange={(e) =>
                setUserData({ ...userData, website: e.target.value })
              }
            />
          </InputContainer>
        </EditContainer>
        <EditContainer>
          <Aside>
            <Label htmlFor="bio">Biogram</Label>
          </Aside>
          <InputContainer>
            <InputArea
              id="bio"
              value={userData.bio}
              onChange={(e) =>
                setUserData({ ...userData, bio: e.target.value })
              }
            />
          </InputContainer>
        </EditContainer>
        <EditContainer>
          <Aside />
          <InputContainer>
            <Description>
              <HeadText>Informacje osobiste</HeadText> Podaj informacje
              osobiste, nawet je??li konto s??u??y do cel??w biznesowych, jest
              kontem dla zwierzaka itp. Nie b??d?? one udost??pniane w Twoim
              profilu publicznym.
            </Description>
          </InputContainer>
        </EditContainer>
        <EditContainer>
          <Aside>
            <Label htmlFor="e-mail">Adres e-mail</Label>
          </Aside>
          <InputContainer>
            <Input
              id="e-mail"
              placeholder="Adres e-mail"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </InputContainer>
        </EditContainer>
        <EditContainer>
          <Aside>
            <Label htmlFor="num">Numer telefonu</Label>
          </Aside>
          <InputContainer>
            <Input
              id="num"
              placeholder="Numer telefonu"
              value={userData.number}
              onChange={(e) =>
                setUserData({ ...userData, number: e.target.value })
              }
            />
          </InputContainer>
        </EditContainer>
        <EditContainer>
          <Aside>
            <Label htmlFor="sex">P??e??</Label>
          </Aside>
          <InputContainer>
            <Input
              id="sex"
              placeholder="P??e??"
              value={userData.sex}
              onChange={(e) =>
                setUserData({ ...userData, sex: e.target.value })
              }
            />
          </InputContainer>
        </EditContainer>
        <EditContainer>
          <Aside />
          <SubmitBtn type="submit">Wy??lij</SubmitBtn>
          <Error>
            {error === "CREDENTIAL_TOO_OLD_LOGIN_AGAIN"
              ? "Zaloguj si?? ponownie aby potwierdzic u??ytkownika."
              : null}
          </Error>
        </EditContainer>
      </Form>
    </>
  );
}

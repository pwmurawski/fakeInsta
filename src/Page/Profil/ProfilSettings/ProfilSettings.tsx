import { NavLink, Routes, Route, useLocation } from "react-router-dom";
import styled from "styled-components";
import ProfilEdit from "./ProfilEdit/ProfilEdit";
import ProfilChangePass from "./ProfilChangePass/ProfilChangePass";
import {
  ILocationState,
  IUserDataProfileSet,
} from "../../../interfaces/interfaces";
import useUserAuthData from "../../../hooks/useUserAuthData";
import useEditProfil from "../../../hooks/useEditProfil";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const Container = styled.section`
  display: flex;
  width: 933px;
  min-height: 780px;
  height: fit-content;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 3px;
`;
const Menu = styled.nav`
  width: 236px;
  height: auto;
  border-right: 1px solid lightgray;
`;
const Content = styled.article`
  flex: 1;
`;
const Ul = styled.ul`
  width: 100%;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
`;
const Option = styled.li`
  box-sizing: border-box;
  width: 100%;
  height: 52;
  padding: 16px 16px 16px 30px;
  font-size: 16px;
  font-weight: 600;
  border-left: 2px solid transparent;
  cursor: pointer;
  :hover {
    border-left: 2px solid lightgray;
    background-color: whitesmoke;
  }
`;
const NavLinkStyleOff = styled(NavLink)`
  text-decoration: none;
  color: black;
  &.active {
    ${Option} {
      border-left: 2px solid black;
    }
    ${Option}:hover {
      background-color: transparent;
    }
  }
`;

export default function ProfilSettings() {
  const { state } = useLocation() as ILocationState;
  const background = state?.background;
  const [userAuthData, setUserAuthData] =
    useUserAuthData<IUserDataProfileSet>();
  const [editProfil, error] = useEditProfil(setUserAuthData);

  if (!userAuthData) return null;
  return (
    <Wrapper>
      <Container>
        <Menu>
          <Ul>
            <NavLinkStyleOff to="/accounts/edit/">
              <Option>Edytuj profil</Option>
            </NavLinkStyleOff>
            <NavLinkStyleOff to="/accounts/password/change/">
              <Option>Zmień hasło</Option>
            </NavLinkStyleOff>
          </Ul>
        </Menu>
        <Content>
          <Routes location={background}>
            <Route
              path="edit"
              element={
                <ProfilEdit
                  defaultValue={userAuthData}
                  onSubmit={editProfil}
                  error={error}
                />
              }
            />
            <Route
              path="password/change"
              element={
                <ProfilChangePass
                  user={{
                    userName: userAuthData.userName,
                    logo: userAuthData.logo,
                  }}
                />
              }
            />
          </Routes>
        </Content>
      </Container>
    </Wrapper>
  );
}

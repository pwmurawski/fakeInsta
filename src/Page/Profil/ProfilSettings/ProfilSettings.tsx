import { NavLink, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import ProfilEdit from "../../../components/ProfilEdit/ProfilEdit";
import ProfilChangePass from "../../../components/ProfilChangePass/ProfilChangePass";

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
          <Routes>
            <Route path="edit" element={<ProfilEdit />} />
            <Route path="password/change" element={<ProfilChangePass />} />
          </Routes>
        </Content>
      </Container>
    </Wrapper>
  );
}

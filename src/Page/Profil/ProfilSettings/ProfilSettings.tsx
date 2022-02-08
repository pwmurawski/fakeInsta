import { NavLink, Routes, Route, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import ProfilEdit from "./ProfilEdit/ProfilEdit";
import ProfilChangePass from "./ProfilChangePass/ProfilChangePass";
import useAuth from "../../../hooks/useAuth";
import Fetch from "../../../helpers/Fetch/Fetch";
import objectToArray from "../../../helpers/objectToArray";

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

interface ILocationState {
  state?: {
    background: string;
  };
}

interface IUserAuthData {
  id: string;
  email: string;
  userFullName: string;
  userId: string;
  userName: string;
  logo?: string;
  website?: string;
  bio?: string;
  number?: string;
  sex?: string;
}
interface IUserData {
  id: string;
  email: string;
  userFullName: string;
  userId: string;
  userName: string;
  logo?: string;
  website: string;
  bio: string;
  number: string;
  sex: string;
}

export default function ProfilSettings() {
  const abortController = new AbortController();
  const s = abortController.signal;
  const { state } = useLocation() as ILocationState;
  const background = state?.background;
  const [auth] = useAuth();
  const [userData, setUserData] = useState<IUserData>({
    id: "",
    email: "",
    userFullName: "",
    userId: "",
    userName: "",
    logo: "",
    website: "",
    bio: "",
    number: "",
    sex: "",
  });

  const getUserAuthData = () => {
    Fetch(`users/${auth?.userId}.json`, { signal: s }, (res) => {
      const newUserData: IUserAuthData[] = objectToArray(res);
      setUserData({
        ...newUserData[0],
        website: newUserData[0].website ?? userData.website,
        bio: newUserData[0].bio ?? userData.bio,
        number: newUserData[0].number ?? userData.number,
        sex: newUserData[0].sex ?? userData.sex,
      });
    });
  };

  useEffect(() => {
    getUserAuthData();

    return () => {
      abortController.abort();
    };
  }, []);

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
                <ProfilEdit userData={userData} setUserData={setUserData} />
              }
            />
            <Route
              path="password/change"
              element={
                <ProfilChangePass
                  user={{ userName: userData.userName, logo: userData.logo }}
                />
              }
            />
          </Routes>
        </Content>
      </Container>
    </Wrapper>
  );
}

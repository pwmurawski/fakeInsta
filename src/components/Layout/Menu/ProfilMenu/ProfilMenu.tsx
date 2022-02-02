import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  ProfilMenuLogoSvg,
  SavedSvg,
  SettingsSvg,
  SwitchAccountSvg,
} from "../../../SvgIcon/ProfilMenu_SvgIcon";
import useAuth from "../../../../hooks/useAuth";

const HiddenProfilMenu = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
`;
const ProfilMenuContainer = styled.section`
  position: absolute;
  top: 40px;
  right: -30px;
  display: flex;
  flex-direction: column;
  width: 230px;
  height: fit-content;
  border-radius: 6px;
  background-color: white;
  box-shadow: 0 0 5px 1px lightgray;
  font-size: 14px;
  z-index: 2;
`;
const ArrowContainer = styled.div`
  position: relative;
  z-index: -1;
`;
const Arrow = styled.div`
  position: absolute;
  top: -6px;
  right: 35px;
  width: 14px;
  height: 14px;
  background-color: white;
  transform: rotate(45deg);
  box-shadow: 0 0 5px 1px lightgray;
`;
const MenuLink = styled(Link)`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 37px;
  padding: 8px 16px;
  color: black;
  text-decoration: none;
  :first-of-type {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: white;
  }
  :last-of-type {
    border-top: 1px solid lightgray;
    height: 50px;
    :hover {
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
  :hover {
    background-color: whitesmoke;
    cursor: pointer;
  }
`;
const Svg = styled.section`
  margin-top: 5px;
  margin-right: 12px;
`;

interface IProfilMenuProps {
  setProfilMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfilMenu({ setProfilMenu }: IProfilMenuProps) {
  const [auth, setAuth] = useAuth();

  return (
    <>
      <ProfilMenuContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ArrowContainer>
          <Arrow />
        </ArrowContainer>
        <MenuLink
          to="/profile/"
          onClick={() => {
            setProfilMenu(false);
          }}
        >
          <Svg>
            <ProfilMenuLogoSvg />
          </Svg>
          Profil
        </MenuLink>
        <MenuLink
          to="/profile/saved/"
          onClick={() => {
            setProfilMenu(false);
          }}
        >
          <Svg>
            <SavedSvg />
          </Svg>
          Zapisane
        </MenuLink>
        <MenuLink
          to="/accounts/edit/"
          onClick={() => {
            setProfilMenu(false);
          }}
        >
          <Svg>
            <SettingsSvg />
          </Svg>
          Ustawienia
        </MenuLink>
        <MenuLink
          to="/profile/"
          onClick={() => {
            setProfilMenu(false);
          }}
        >
          <Svg>
            <SwitchAccountSvg />
          </Svg>
          Przełącz konto
        </MenuLink>
        <MenuLink
          to="/"
          onClick={() => {
            setProfilMenu(false);
            setAuth(false);
          }}
        >
          Wyloguj się
        </MenuLink>
      </ProfilMenuContainer>
      <HiddenProfilMenu
        onClick={(e) => {
          setProfilMenu(false);
          e.stopPropagation();
        }}
      />
    </>
  );
}

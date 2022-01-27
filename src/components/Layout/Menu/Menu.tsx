import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import ProfilMenu from "./ProfilMenu/ProfilMenu";
import userImg from "../../../assets/user.jpg";
import {
  DirectSvg,
  HomeSvg,
  AddPostSvg,
  ExploreSvg,
  ActivitySvg,
  ExploreSvgActive,
  HomeSvgActive,
  DirectSvgActive,
  AddPostSvgActive,
} from "../../SvgIcon/Menu_SvgIcon";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Icon = styled.div`
  width: 24px;
  height: 24px;
  padding-left: 22px;
  position: relative;

  @media (max-width: 500px) {
    :first-child {
      padding-left: 0;
    }
  }
  @media (max-width: 404px) {
    :first-child,
    & {
      padding-left: 10px;
    }
  }
  @media (max-width: 331px) {
    :first-child,
    & {
      padding-left: 5px;
    }
  }
`;

const ImgProfileMenu = styled.img`
  box-sizing: border-box;
  cursor: pointer;
  border: ${({ active }: { active: boolean }) =>
    active ? "2px solid black" : "none"};
  border-radius: 150px;
`;
const Btn = styled.button`
  background: transparent;
  border: 0;
  padding: 0;
`;

export default function Menu() {
  const [profilMenu, setProfilMenu] = useState(false);
  const { pathname } = useLocation();

  return (
    <Wrapper>
      <Icon>
        <NavLink to="/">
          {({ isActive }) => (isActive ? <HomeSvgActive /> : <HomeSvg />)}
        </NavLink>
      </Icon>
      <Icon>
        <NavLink to="/direct/inbox/">
          {({ isActive }) => (isActive ? <DirectSvgActive /> : <DirectSvg />)}
        </NavLink>
      </Icon>
      <Icon>
        <NavLink to="/create/select/" state={{ background: pathname }}>
          {({ isActive }) => (isActive ? <AddPostSvgActive /> : <AddPostSvg />)}
        </NavLink>
      </Icon>
      <Icon>
        <NavLink to="/explore/">
          {({ isActive }) => (isActive ? <ExploreSvgActive /> : <ExploreSvg />)}
        </NavLink>
      </Icon>
      <Icon>
        <Btn>
          {/* <ActivitySvgActive /> */}
          <ActivitySvg />
        </Btn>
      </Icon>
      <Icon>
        <Btn
          onClick={() => {
            setProfilMenu(true);
          }}
        >
          <ImgProfileMenu
            active={profilMenu}
            src={userImg}
            alt="user"
            width="24px"
            height="24px"
          />
          {profilMenu ? <ProfilMenu setProfilMenu={setProfilMenu} /> : null}
        </Btn>
      </Icon>
    </Wrapper>
  );
}

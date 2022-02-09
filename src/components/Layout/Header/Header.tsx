import { ReactChild } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../../assets/logo2.png";
import SearchBar from "../../SearchBar/SearchBar";
import { Wrapper, Logo, Menu, Search } from "./Header_styles";

interface IHeaderProps {
  children: ReactChild;
}

export default function Header({ children }: IHeaderProps) {
  return (
    <Wrapper>
      <Logo>
        <Link to="/">
          <img src={logoImg} alt="instagram" />
        </Link>
      </Logo>
      <Search>
        <SearchBar />
      </Search>
      <Menu>{children}</Menu>
    </Wrapper>
  );
}

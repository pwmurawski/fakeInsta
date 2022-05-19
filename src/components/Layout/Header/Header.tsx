import { Link } from "react-router-dom";
import logoImg from "../../../assets/logo2.png";
import { IHeaderProps } from "../../../interfaces/interfaces";
import SearchBar from "../../Search/SearchBar/SearchBar";
import { Wrapper, Logo, Menu, Search } from "./Header_styles";

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

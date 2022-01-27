import { Header, User, UserName } from "./PostHeader_styles";
import { Btn, UserLogo } from "../../../../GlobalStyle/GlobalStyle";
import OptionsSvg from "../../../SvgIcon/PostHeader_SvgIcon";

interface IPostHeaderProps {
  userName: string;
  userLogo: string;
  storiesActive?: boolean;
}

const defaultProps = {
  storiesActive: undefined,
};

export default function PostHeader({
  userName,
  userLogo,
  storiesActive,
}: IPostHeaderProps) {
  return (
    <Header>
      <User>
        <UserLogo stories={storiesActive} src={userLogo} />
        <UserName>{userName}</UserName>
      </User>
      <Btn>
        <OptionsSvg />
      </Btn>
    </Header>
  );
}

PostHeader.defaultProps = defaultProps;

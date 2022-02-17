import {
  Header,
  User,
  UserName,
  Container,
  Location,
  LinkOffStyle,
} from "./PostHeader_styles";
import { Btn, UserLogo } from "../../../../../GlobalStyle/GlobalStyle";
import OptionsSvg from "../../../../SvgIcon/PostHeader_SvgIcon";

interface IPostHeaderProps {
  userName: string;
  userLogo: string;
  userId?: string;
  location: string;
  storiesActive?: boolean;
}

const defaultProps = {
  storiesActive: undefined,
  userId: "",
};

export default function PostHeader({
  userName,
  userLogo,
  userId,
  location,
  storiesActive,
}: IPostHeaderProps) {
  return (
    <Header>
      <User>
        <LinkOffStyle
          to={storiesActive ? `/stories/${userId}/` : `/u/${userId}/`}
        >
          <UserLogo storiesActive={storiesActive} src={userLogo} />
        </LinkOffStyle>
        <Container>
          <LinkOffStyle to={`/u/${userId}/`}>
            <UserName>{userName}</UserName>
          </LinkOffStyle>
          <Location>{location}</Location>
        </Container>
      </User>
      <Btn>
        <OptionsSvg />
      </Btn>
    </Header>
  );
}

PostHeader.defaultProps = defaultProps;

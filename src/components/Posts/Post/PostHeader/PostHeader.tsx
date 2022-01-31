import {
  Header,
  User,
  UserName,
  Container,
  Location,
} from "./PostHeader_styles";
import { Btn, UserLogo } from "../../../../GlobalStyle/GlobalStyle";
import OptionsSvg from "../../../SvgIcon/PostHeader_SvgIcon";

interface IPostHeaderProps {
  userName: string;
  userLogo: string;
  location: string;
  storiesActive?: boolean;
}

const defaultProps = {
  storiesActive: undefined,
};

export default function PostHeader({
  userName,
  userLogo,
  location,
  storiesActive,
}: IPostHeaderProps) {
  return (
    <Header>
      <User>
        <UserLogo stories={storiesActive} src={userLogo} />
        <Container>
          <UserName>{userName}</UserName>
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

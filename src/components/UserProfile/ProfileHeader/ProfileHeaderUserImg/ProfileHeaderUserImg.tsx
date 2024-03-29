import styled from "styled-components";
import { Link } from "react-router-dom";
import userImg from "../../../../assets/user.jpg";
import { UserLogo } from "../../../../GlobalStyle/GlobalStyle";
import { IProfileHeaderUserImgProps } from "../../../../interfaces/interfaces";

const Img = styled(UserLogo)`
  width: 150px;
  height: 150px;
  border-radius: 150px;
  @media (max-width: 735px) {
    width: 77px;
    height: 77px;
  }
`;
const UserImg = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  max-width: 291px;
  width: 100%;
  margin-right: 30px;
  flex-shrink: 2;
  @media (max-width: 735px) {
    width: fit-content;
    height: fit-content;
    margin-right: 28px;
  }
`;

export default function ProfileHeaderUserImg({
  userData,
}: IProfileHeaderUserImgProps) {
  if (!userData) return null;
  return (
    <UserImg>
      <Link to={userData.storiesActive ? `/stories/${userData.userId}/` : "./"}>
        <Img
          storiesActive={userData.storiesActive}
          src={userData.logo ?? userImg}
        />
      </Link>
    </UserImg>
  );
}

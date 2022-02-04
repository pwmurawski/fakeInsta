import { Link } from "react-router-dom";
import styled from "styled-components";
import postHomeImg from "../../../assets/postHome.png";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 150px;
`;

const Desc = styled.span`
  text-align: center;
  max-width: 400px;
  width: 100%;
  margin-top: 30px;
  font-size: 20px;
`;

export default function NoWatchedUsers() {
  return (
    <Wrapper>
      <Link to="explore/">
        <img src={postHomeImg} alt="post" width="200px" height="200px" />
      </Link>
      <Desc>Zacznij obserwowac innych użytkownikow aby widziec ich posty</Desc>
    </Wrapper>
  );
}

import styled from "styled-components";
import { Btn, HeaderCreatePost } from "../../../GlobalStyle/GlobalStyle";
import { BackSvg } from "../../../components/SvgIcon/CreateNewPost_SvgIcon";
import { IAddPostHeaderProps } from "../../../interfaces/interfaces";

const ShareBtn = styled.button`
  justify-self: flex-start;
  border: 0;
  margin-right: 10px;
  background: transparent;
  cursor: pointer;
  color: #0095f6;
  font-size: 14px;
  font-weight: 600;
`;
const H1 = styled.h1`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

export default function AddPostHeader({
  onClickShareBtn,
  onClickBackBtn,
}: IAddPostHeaderProps) {
  return (
    <HeaderCreatePost justify="space-between">
      <Btn onClick={onClickBackBtn}>
        <BackSvg />
      </Btn>
      <H1>Utwórz nowy post</H1>
      <ShareBtn onClick={onClickShareBtn}>Udostępnij</ShareBtn>
    </HeaderCreatePost>
  );
}

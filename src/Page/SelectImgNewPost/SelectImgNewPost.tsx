import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ExitSvg from "../../components/SvgIcon/AddNewMessage_SvgIcon";
import { SelectImgSvg } from "../../components/SvgIcon/CreateNewPost_SvgIcon";
import {
  ModalWindowWrapper,
  HeaderCreatePost,
  ExitBtnModalWindow,
} from "../../GlobalStyle/GlobalStyle";
import Modal from "../../hoc/Modal";
import {
  NewPostContainer,
  BtnChooseFile,
  Content,
  H1,
  H2,
  Input,
} from "./SelectImgNewPost_styles";

interface ILocationState {
  state?: {
    background: string;
  };
}

function SelectImgNewPost() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { state } = useLocation() as ILocationState;

  const BtnChooseFileHandler = () => {
    inputRef.current?.click();
  };

  const onChangeImgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const render = new FileReader();
    render.addEventListener("load", () => {
      if (typeof render.result === "string") {
        navigate("/create/details/", {
          state: { background: state?.background, uploadImg: render.result },
        } as object);
      }
    });
    if (e.target.files) {
      render.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <ModalWindowWrapper
      onClick={() => {
        navigate(-1);
      }}
    >
      <ExitBtnModalWindow>
        <ExitSvg color="white" width="25" height="25" />
      </ExitBtnModalWindow>
      <NewPostContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <HeaderCreatePost>
          <H1>Utwórz nowy post</H1>
        </HeaderCreatePost>
        <Content>
          <SelectImgSvg />
          <H2>Przeciągnij zdjęcia i filmy tutaj</H2>
          <BtnChooseFile onClick={BtnChooseFileHandler}>
            Wybierz z komputera
          </BtnChooseFile>
          <Input onChange={onChangeImgInput} ref={inputRef} type="file" />
        </Content>
      </NewPostContainer>
    </ModalWindowWrapper>
  );
}

export default Modal(SelectImgNewPost);

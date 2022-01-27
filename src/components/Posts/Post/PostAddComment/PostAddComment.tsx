import React from "react";
import { AddComment, BtnSubmit, InputComment } from "./PostAddComment_styles";
import { Btn } from "../../../../GlobalStyle/GlobalStyle";
import { EmoticonSvg } from "../../../SvgIcon/CreateNewPost_SvgIcon";

export default function PostAddComment() {
  const inputCommentOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "25px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <AddComment>
      <Btn>
        <EmoticonSvg color="rgb(38, 38, 38)" width="24" height="24" />
      </Btn>
      <InputComment
        onChange={inputCommentOnChange}
        placeholder="Dodaj komentarz..."
      />
      <BtnSubmit>Opublikuj</BtnSubmit>
    </AddComment>
  );
}

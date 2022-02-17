/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { AddComment, BtnSubmit, InputComment } from "./PostAddComment_styles";
import { Btn } from "../../../../../GlobalStyle/GlobalStyle";
import { EmoticonSvg } from "../../../../SvgIcon/CreateNewPost_SvgIcon";

export default function PostAddComment({
  onAddNewComment,
}: {
  onAddNewComment: (
    newContent: string,
    setNewContentComment: React.Dispatch<React.SetStateAction<string>>
  ) => void;
}) {
  const [newContentComment, setNewContentComment] = useState("");

  const inputCommentOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "25px";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setNewContentComment(e.target.value);
  };

  return (
    <AddComment>
      <Btn>
        <EmoticonSvg color="rgb(38, 38, 38)" width="24" height="24" />
      </Btn>
      <InputComment
        value={newContentComment}
        onChange={inputCommentOnChange}
        placeholder="Dodaj komentarz..."
      />
      <BtnSubmit
        onClick={() => onAddNewComment(newContentComment, setNewContentComment)}
      >
        Opublikuj
      </BtnSubmit>
    </AddComment>
  );
}

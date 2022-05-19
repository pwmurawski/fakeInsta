import { ICommentsProps } from "../../../../../interfaces/interfaces";
import Comment from "./Comment/Comment";

export default function Comments({ comments }: ICommentsProps) {
  return (
    <>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          user={comment.user}
          content={comment.content}
        />
      ))}
    </>
  );
}

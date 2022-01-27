import Comment from "./Comment/Comment";

interface ICommentsProps {
  comments: {
    id: number;
    user: {
      userName: string;
      userLogo: string;
      storiesActive?: boolean;
    };
    content: string;
  }[];
}

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

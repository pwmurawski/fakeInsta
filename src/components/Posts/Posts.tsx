import Post from "./Post/Post";

interface IPostsProps {
  postsData: {
    id: number;
    user: {
      id: number;
      userName: string;
      logo: string;
      storiesActive?: boolean;
    };
    img: string;
    like: number;
    description: string;
    comments: number;
    time: number;
  }[];
}

export default function Posts({ postsData }: IPostsProps) {
  return (
    <>
      {postsData.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          user={post.user}
          img={post.img}
          like={post.like}
          description={post.description}
          comments={post.comments}
          time={post.time}
        />
      ))}
    </>
  );
}

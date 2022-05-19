import { IPostsProps } from "../../interfaces/interfaces";
import Post from "./Post/Post";

export default function Posts({ postsData }: IPostsProps) {
  return (
    <>
      {postsData.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          img={post.img}
          likes={post.likes}
          desc={post.desc}
          location={post.location}
          date={post.date}
          user={post.user}
        />
      ))}
    </>
  );
}

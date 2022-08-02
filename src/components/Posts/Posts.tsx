import { IPostsProps } from "../../interfaces/interfaces";
import NoWatchedUsers from "../InfoLackPosts/NoWatchedUsers/NoWatchedUsers";
import Post from "./Post/Post";

export default function Posts({ postsData }: IPostsProps) {
  if (postsData.length === 0) return <NoWatchedUsers />;
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

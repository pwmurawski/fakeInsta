import Post from "./Post/Post";

interface IPostsProps {
  postsData: {
    id: string;
    desc: string;
    img: string;
    likes?: string[];
    location: string;
    date: string;
    user: {
      userFullName: string;
      userId: string;
      userName: string;
      logo?: string;
      storiesActive?: boolean;
    };
  }[];
}

export default function Posts({ postsData }: IPostsProps) {
  return (
    <>
      {postsData.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          img={post.img}
          likes={post.likes}
          description={post.desc}
          location={post.location}
          date={post.date}
          user={post.user}
        />
      ))}
    </>
  );
}

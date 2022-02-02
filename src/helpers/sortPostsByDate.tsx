interface IPostsData {
  date: string;
}

const sortPostsByDate = (post1: IPostsData, post2: IPostsData): number => {
  return new Date(post2.date).getTime() - new Date(post1.date).getTime();
};

export default sortPostsByDate;

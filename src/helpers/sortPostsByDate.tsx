import { IPostsDataSort } from "../interfaces/interfaces";

const sortPostsByDate = (
  post1: IPostsDataSort,
  post2: IPostsDataSort
): number => {
  return new Date(post2.date).getTime() - new Date(post1.date).getTime();
};

export default sortPostsByDate;

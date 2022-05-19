import { IComment } from "../interfaces/interfaces";
import fetchApi from "./fetchApi/fetchApi";

export const fetchAddComment = (
  postId: string,
  data: IComment,
  signal?: AbortSignal
) => {
  return fetchApi(`comments/${postId}.json`, {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const fetchCommentsPost = (postId: string, signal?: AbortSignal) => {
  return fetchApi(`comments/${postId}.json`, { signal });
};

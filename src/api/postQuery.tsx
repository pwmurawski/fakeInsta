import { IPostData } from "../interfaces/interfaces";
import fetchApi from "./fetchApi/fetchApi";

export const fetchPost = (
  postId: string,
  userId: string,
  signal: AbortSignal
) => {
  return fetchApi(`posts/${userId}/${postId}.json`, { signal });
};

export const fetchLikeHandlerePost = (
  postId: string,
  userId: string,
  data: string[],
  signal: AbortSignal
) => {
  return fetchApi(`posts/${userId}/${postId}/likes.json`, {
    method: "PUT",
    signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const fetchSavedPostHandler = (
  userId: string,
  userAuthDataId: string,
  data: string[] | undefined,
  signal?: AbortSignal
) => {
  return fetchApi(`users/${userId}/${userAuthDataId}/savedPosts.json`, {
    method: "PUT",
    signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const fetchUserPosts = (userId: string, signal: AbortSignal) => {
  return fetchApi(`posts/${userId}.json`, { signal });
};

export const fetchPosts = (signal: AbortSignal) => {
  return fetchApi("posts.json", { signal });
};

export const fetchCreateNewPost = (
  userId: string,
  newPostData: IPostData,
  signal: AbortSignal
) => {
  return fetchApi(`posts/${userId}.json`, {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPostData),
  });
};

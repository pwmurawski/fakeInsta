/* eslint-disable import/prefer-default-export */
import fetchApi from "./fetchApi/fetchApi";

export const fetchUser = (userId: string, signal?: AbortSignal) => {
  return fetchApi(`users/${userId}.json`, { signal });
};

export const fetchAddToWatchedUsers = (
  userAuthId: string,
  userAuthDataId: string,
  userWatchedId: string | undefined,
  usersWatched: string[] | undefined,
  signal: AbortSignal
) => {
  return fetchApi(`users/${userAuthId}/${userAuthDataId}/usersWatched.json`, {
    method: "PUT",
    signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([...(usersWatched ?? []), userWatchedId]),
  });
};

export const fetchDeleteToWatchedUsers = (
  userId: string,
  userAuthDataId: string,
  delUserWatch: string[] | undefined,
  signal: AbortSignal
) => {
  return fetchApi(`users/${userId}/${userAuthDataId}/usersWatched.json`, {
    method: "PUT",
    signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(delUserWatch),
  });
};

export const fetchUsers = (signal?: AbortSignal) => {
  return fetchApi("users.json", { signal });
};

/* eslint-disable no-unused-vars */

interface IRes {
  email: string;
  idToken: string;
  localId: string;
  error: object;
}

export default async function FetchAuth(
  url: string,
  options: RequestInit,
  fnc: (res: IRes) => void
) {
  const baseUrl = process.env.REACT_APP_DATABASE_AUTH;
  const keyApi = process.env.REACT_APP_KEYAPI;

  try {
    const request = await fetch(`${baseUrl}${url}${keyApi}`, options);
    const res = await request.json();
    fnc(res);
  } catch (error) {
    if (!options.signal?.aborted) {
      // console.log(error);
    }
  }
}

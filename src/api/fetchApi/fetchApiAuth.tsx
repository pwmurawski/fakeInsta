import { IRes } from "../../interfaces/interfaces";

export default async function fetchApiAuth(url: string, options: RequestInit) {
  const baseUrl = process.env.REACT_APP_DATABASE_AUTH;
  const keyApi = process.env.REACT_APP_KEYAPI;
  let res: IRes | undefined;

  try {
    const request = await fetch(`${baseUrl}${url}${keyApi}`, options);
    res = await request.json();
  } catch (error) {
    if (!options.signal?.aborted) {
      // console.log(error);
    }
  }
  return res;
}

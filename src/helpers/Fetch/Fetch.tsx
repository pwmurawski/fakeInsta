/* eslint-disable no-unused-vars */
export default async function Fetch(
  url: string,
  options: RequestInit,
  fnc: (res: Array<object> | object) => void
) {
  const baseUrl = process.env.REACT_APP_DATABASE;

  try {
    const request = await fetch(`${baseUrl}${url}`, options);
    const res = await request.json();
    fnc(res);
  } catch (error) {
    if (!options.signal?.aborted) {
      // console.log(error);
    }
  }
}

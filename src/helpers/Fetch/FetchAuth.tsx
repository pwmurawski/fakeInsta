/* eslint-disable no-unused-vars */
export default async function FetchAuth(
  url: string,
  options: RequestInit,
  fnc: (res: Array<object> | object) => void
) {
  try {
    const request = await fetch(url, options);
    const res = await request.json();
    fnc(res);
  } catch (error) {
    if (!options.signal?.aborted) {
      // console.log(error);
    }
  }
}

/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */

const objectToArray = (obj: any, addId?: boolean) => {
  const arr = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (addId === false) {
        arr.push({ ...obj[key] });
      } else {
        arr.push({ ...obj[key], id: key });
      }
    }
  }
  return arr;
};

export default objectToArray;

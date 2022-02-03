const modifyDate = (date: string): string => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  return `${day < 10 ? 0 : ""}${day}.${month < 10 ? 0 : ""}${month}.${year}  ${
    hours < 10 ? 0 : ""
  }${hours}:${minutes < 10 ? 0 : ""}${minutes}`;
};

export default modifyDate;

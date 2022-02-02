const modifyDate = (date: string): string => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  return `${day}.${month}.${year}  ${hours}:${minutes}`;
};

export default modifyDate;

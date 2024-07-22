export const getExactDayTimestamp = () => {
  const date = new Date();

  const exactDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  return exactDay.getTime();
};

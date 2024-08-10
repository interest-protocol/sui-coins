export const getExactDayTimestamp = () => {
  const date = new Date();

  const exactDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  return exactDay.getTime();
};

export const getFirstWeekDayTimestamp = (timestamp?: number) => {
  const date = timestamp ? new Date(timestamp) : new Date();

  const exactDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  return exactDay.getTime() - date.getDay() * (1000 * 60 * 60 * 24);
};

export const getStartDate = () => {
  const now = new Date();

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return now.toLocaleDateString('en-GB', options).replace(',', '');
};

export const getEstimatedEndDate = (frequencyType: number, orders: number) => {
  const now = new Date();
  const endDate = new Date(now);

  switch (frequencyType) {
    case 0:
      endDate.setSeconds(now.getSeconds() + orders);
      break;
    case 1:
      endDate.setMinutes(now.getMinutes() + orders);
      break;
    case 2:
      endDate.setHours(now.getHours() + orders);
      break;
    case 3:
      endDate.setDate(now.getDate() + orders);
      break;
    case 4:
      endDate.setDate(now.getDate() + orders * 7);
      break;
    case 5:
      endDate.setMonth(now.getMonth() + orders);
      break;
    default:
      break;
  }

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return endDate.toLocaleDateString('en-GB', options).replace(',', '');
};

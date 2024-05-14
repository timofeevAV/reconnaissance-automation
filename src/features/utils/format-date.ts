export const formatDate = (date: string) => {
  const originalDate = new Date(date);
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(originalDate);
  return formattedDate;
};

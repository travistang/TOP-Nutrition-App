import { format } from 'date-fns';

const toInputFormat = (date: number | Date) => {
  const inputFormat = "yyyy-MM-dd'T'HH:mm";
  return format(date, inputFormat);
};

const stringToDate = (date: string) => {
  return new Date(date).getTime();
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  toInputFormat,
  stringToDate,
};
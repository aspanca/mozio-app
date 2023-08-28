import { format } from 'date-fns';
import { DateTime } from 'luxon';

export const formatDate = (date: string) => {
  return DateTime.fromISO(new Date(date as string).toISOString()).toFormat(
    'MMM d, yyyy'
  );
};

export const isBeforeToday = (date: Date) => {
  return date < new Date(new Date().setHours(0, 0, 0, 0));
};

export const formatCalendarDate = (date?: Date) => {
  return date ? format(date, 'PPP') : 'Pick a date';
};

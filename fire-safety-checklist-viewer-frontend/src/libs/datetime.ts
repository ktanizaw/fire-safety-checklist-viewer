import { format } from 'date-fns';

export const formatDate = (iso: string) => {
  return format(new Date(iso), 'd MMM yyyy');
};

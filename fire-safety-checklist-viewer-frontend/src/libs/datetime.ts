import { format } from 'date-fns';

export const formatDate = (iso: string) => {
  if (!iso) {
    return 'Not set';
  }

  return format(new Date(iso), 'd MMM yyyy');
};

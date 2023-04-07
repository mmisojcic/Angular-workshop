import * as moment from 'moment';

import { dateBaseDateFormat } from '../constants';

export const transformDateToDataBaseDateFormat = (date: Date): string =>
  moment(date).format(dateBaseDateFormat);

export const sortArrayByField = <T>(arr: T[], fieldName: keyof T): T[] => {
  return arr.sort((a, b) => {
    const valueA = a[fieldName];
    const valueB = b[fieldName];

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueA - valueB;
    } else if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueA.localeCompare(valueB);
    } else if (
      new Date(valueA as string) instanceof Date &&
      new Date(valueB as string) instanceof Date
    ) {
      return (
        new Date(valueA as string).getTime() -
        new Date(valueB as string).getTime()
      );
    } else {
      throw new Error(
        `Sort error: ${fieldName.toString()}-Field type is not consistent within the array.`
      );
    }
  });
};

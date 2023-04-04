import * as moment from 'moment';

import { dateBaseDateFormat } from '../constants';

export const transformDateToDataBaseDateFormat = (date: Date): string =>
  moment(date).format(dateBaseDateFormat);
